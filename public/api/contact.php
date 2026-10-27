<?php
/**
 * Contact endpoint for sajidafridi.com
 *
 * POST /api/contact
 *   JSON or form-encoded: name, email, message, website (honeypot)
 *
 * Stores the submission in SQLite outside the document root and emails a
 * notification. No credentials live in this file or in the repository.
 */

declare(strict_types=1);

const NOTIFY_TO        = 'ceo@megnitoo.com';
const NOTIFY_FROM      = 'no-reply@sajidafridi.com';
const RATE_WINDOW      = 3600; // seconds
const RATE_PER_IP      = 3;
const RATE_GLOBAL      = 40;
const MAX_BODY_BYTES   = 16384;
const MAX_NAME         = 80;
const MAX_EMAIL        = 200;
const MAX_MESSAGE      = 5000;
const MIN_MESSAGE      = 10;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $code): never
{
    respond($status, ['ok' => false, 'error' => $code]);
}

/** Strip control characters and collapse whitespace. */
function clean_line(string $value): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method_not_allowed');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    fail(413, 'payload_too_large');
}

$raw  = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES);
$type = strtolower($_SERVER['CONTENT_TYPE'] ?? '');

if (str_contains($type, 'application/json')) {
    $data = json_decode($raw !== false ? $raw : '', true);
    if (!is_array($data)) {
        fail(400, 'invalid_json');
    }
} else {
    $data = $_POST;
}

$name    = clean_line((string) ($data['name'] ?? ''));
$email   = clean_line((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['website'] ?? ''));

// Honeypot: a bot filled a field humans never see. Accept silently so the bot
// does not learn anything, but store nothing and send nothing.
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

if (mb_strlen($name) < 2 || mb_strlen($name) > MAX_NAME) {
    fail(422, 'invalid_name');
}
if (mb_strlen($email) > MAX_EMAIL || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    fail(422, 'invalid_email');
}
if (mb_strlen($message) < MIN_MESSAGE || mb_strlen($message) > MAX_MESSAGE) {
    fail(422, 'invalid_message');
}

/* ---------- storage + rate limiting (SQLite, outside public_html) ---------- */

$privateDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'private';
if (!is_dir($privateDir) && !mkdir($privateDir, 0700, true) && !is_dir($privateDir)) {
    error_log('contact: cannot create private directory');
    fail(503, 'storage_unavailable');
}

$saltFile = $privateDir . DIRECTORY_SEPARATOR . 'contact.salt';
if (!is_file($saltFile)) {
    file_put_contents($saltFile, bin2hex(random_bytes(32)), LOCK_EX);
    @chmod($saltFile, 0600);
}
$salt = trim((string) file_get_contents($saltFile));

$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|' . $salt);

try {
    $pdo = new PDO('sqlite:' . $privateDir . DIRECTORY_SEPARATOR . 'contact.sqlite', null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA journal_mode = WAL');
    $pdo->exec('PRAGMA busy_timeout = 4000');
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            ip_hash TEXT NOT NULL,
            user_agent TEXT,
            delivered INTEGER NOT NULL DEFAULT 0
        )'
    );
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS rate (
            ip_hash TEXT NOT NULL,
            created_at INTEGER NOT NULL
        )'
    );
    $pdo->exec('CREATE INDEX IF NOT EXISTS rate_ip_time ON rate (ip_hash, created_at)');

    $now = time();
    $pdo->prepare('DELETE FROM rate WHERE created_at < ?')->execute([$now - RATE_WINDOW]);

    $perIp = $pdo->prepare('SELECT COUNT(*) FROM rate WHERE ip_hash = ? AND created_at >= ?');
    $perIp->execute([$ipHash, $now - RATE_WINDOW]);
    if ((int) $perIp->fetchColumn() >= RATE_PER_IP) {
        header('Retry-After: ' . RATE_WINDOW);
        fail(429, 'rate_limited');
    }

    $global = $pdo->prepare('SELECT COUNT(*) FROM rate WHERE created_at >= ?');
    $global->execute([$now - RATE_WINDOW]);
    if ((int) $global->fetchColumn() >= RATE_GLOBAL) {
        header('Retry-After: ' . RATE_WINDOW);
        fail(429, 'rate_limited');
    }

    $pdo->prepare('INSERT INTO rate (ip_hash, created_at) VALUES (?, ?)')->execute([$ipHash, $now]);
    $pdo->prepare(
        'INSERT INTO submissions (created_at, name, email, message, ip_hash, user_agent)
         VALUES (?, ?, ?, ?, ?, ?)'
    )->execute([
        gmdate('c'),
        $name,
        $email,
        $message,
        $ipHash,
        mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    ]);
    $id = (int) $pdo->lastInsertId();
} catch (Throwable $e) {
    error_log('contact: storage failure: ' . $e->getMessage());
    fail(503, 'storage_unavailable');
}

/* ------------------------------- notification ------------------------------ */

$subject = 'New contact form submission — sajidafridi.com';
$body = implode("\n", [
    'New message from the sajidafridi.com contact form.',
    '',
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Sent at: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'Record:  #' . $id,
    '',
    '--- message ---',
    $message,
    '',
]);

$headers = implode("\r\n", [
    'From: Sajid Afridi Website <' . NOTIFY_FROM . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
    'X-Mailer: sajidafridi.com contact endpoint',
]);

$delivered = @mail(NOTIFY_TO, $subject, $body, $headers) ? 1 : 0;
if ($delivered === 1) {
    try {
        $pdo->prepare('UPDATE submissions SET delivered = 1 WHERE id = ?')->execute([$id]);
    } catch (Throwable $e) {
        error_log('contact: could not flag delivery: ' . $e->getMessage());
    }
}

// The submission is stored either way, so the visitor sees success even if the
// notification mail is delayed; the record is the source of truth.
respond(200, ['ok' => true, 'id' => $id, 'delivered' => (bool) $delivered]);
