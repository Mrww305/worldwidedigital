<?php
/**
 * Health probe for the sajidafridi.com backend.
 * GET /api/health — proves PHP executes and the storage layer is usable.
 * Deliberately returns no version strings, paths, or credentials.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$storage = extension_loaded('pdo_sqlite');
$privateDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'private';
$writable = is_dir($privateDir) ? is_writable($privateDir) : is_writable(dirname($privateDir));

http_response_code($storage && $writable ? 200 : 503);
echo json_encode([
    'ok' => $storage && $writable,
    'service' => 'contact',
    'storage' => $storage,
    'writable' => $writable,
], JSON_UNESCAPED_SLASHES);
