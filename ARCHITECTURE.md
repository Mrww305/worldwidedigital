# Architecture — sajidafridi.com and the property network

Last verified: 2026-10-27. Everything below was read from the live Hostinger
account (`u779968859`, order `1009317328`), not from assumptions.

## 1. Shared platform

| Layer | What it is |
|---|---|
| Hosting | Hostinger Business shared hosting, CloudLinux, server `srv2231` |
| Account | `u779968859` · order `1009317328` · subscription `AzyY4HVJOSPpo18kp` |
| Web server | LiteSpeed/Apache with `.htaccess` per document root |
| PHP | 8.3.36 (8.0–8.5 selectable), mysqli + pdo_mysql + pdo_sqlite enabled |
| Node | Node 22 build runner for Vite projects; Passenger + Node 22 for the one Express app |
| Databases | MySQL on `127.0.0.1:3306` (none created yet); SQLite usable per site |
| Deploy | Git auto-deploy from the GitHub installation `01a0aa26-64fd-7210-843b-c0027137e55b`, branch `main`, `npm install` → `npm run build` → `dist/` copied into `public_html` |
| TLS/DNS | Hostinger-managed, `www` → apex 301 at the `.htaccess` level |

Every property below is a separate document root on that one account, so they
share CPU, memory, inodes and the PHP/Node pools. A runaway loop in one site
degrades the others.

## 2. Property map

| # | Property | Repo | Stack | Output | Runtime |
|---|---|---|---|---|---|
| 1 | sajidafridi.com | `Mrww305/worldwidedigital` | Vite 6.4.5 · React 18 · Tailwind 4 · three.js | prerendered static + PHP API | static + PHP-FPM |
| 2 | worldwidedigital.sajidafridi.com | `Mrww305/worldwidedigital` | same repo, second deployment | identical static build | static |
| 3 | afridi-305.sajidafridi.com | `Mrww305/afridi_305` | Vite SPA, light "drafting table" theme | `dist/` | static |
| 4 | rtx.sajidafridi.com | `Mrww305/rtx` | Vite · Rapier WASM · Web Audio | `dist/` | static |
| 5 | rtxzone.sajidafridi.com | `Mrww305/rtxzone` | Vite, RESHMA TEX masterplan | `dist/` | static |
| 6 | gtmsaas.sajidafridi.com | `Mrww305/gtmsaas` | Vite, RevFlow landing | `dist/` | static |
| 7 | liquid.sajidafridi.com | `Mrww305/Liquid-light-` | Vite · WebGL refraction | `dist/` | static |
| 8 | megnitoocorporate.sajidafridi.com | `Mrww305/aiinnovationshowcase` | Vite, AI agents landing | `dist/` | static |
| 9 | advanzo.sajidafridi.com | `Mrww305/advanzo` | Vite + SSR bundle artifact | `dist/` | static |
| 10 | digicard.sajidafridi.com | `Mrww305/digicard` | Vite, digital CV | `dist/` | static |
| 11 | megnitoo.blog | `Mrww305/Front-` | Express (`server.js`) | `hbuilds/current/nodejs` | Passenger, Node 22, port 3000 |
| 12 | 305.sajidafridi.com | — (hand-authored) | single static `index.html` under `sajidafridi.com/305` | 1.8 kB | static |
| 13 | megnitoo.com | — | Hostinger Horizons (AI builder) | managed | managed |
| 14 | mediumslateblue-bison-917934.hostingersite.com | — | Hostinger Horizons (AI builder) | managed | managed |
| 15 | insightedge.blog | — | Hostinger `default.php` placeholder | 16 kB | PHP |

Notes:

- **#15 insightedge.blog is enabled but not deployed.** It serves Hostinger's
  stock `default.php`. Mail is provisioned for the domain, so it is a live
  mailbox with no website behind it.
- **#12 305.sajidafridi.com** is not a separate build; the file lives inside
  the main site's document root (`public_html/305/`), so it deploys with
  `sajidafridi.com`.
- **#2** is a full duplicate of the main portfolio (same routes, fonts, JSON-LD),
  built from the same commit. Any content change ships twice.
- **#9** ships `server.cjs` and `server.cjs.map` in `public_html` — a leftover
  SSR bundle, not referenced by the static page. It is public source.
- **#6** loads Font Awesome from `cdnjs.cloudflare.com`, the only third-party
  runtime dependency in the network.

## 3. sajidafridi.com (primary)

```
GitHub Mrww305/worldwidedigital @ main
        │  push  →  auto-deploy
        ▼
Hostinger build runner · Node 22 · npm · Vite 6.4.5
        │  vite build  +  vite build --ssr  +  scripts/prerender.mjs
        ▼
dist/  →  /home/u779968859/domains/sajidafridi.com/public_html
        │
        ▼
LiteSpeed + .htaccess  →  prerendered HTML · hashed assets · PHP API
```

**Front end.** React 18 SPA with a dependency-free history-API router over six
routes (`/`, `/about`, `/experience`, `/projects`, `/lab`, `/contact`). Each
route is prerendered with `react-dom/server` into its own `index.html` plus a
flat `<route>.html`, with per-route title, description, canonical, OG/Twitter
tags and `WebPage` JSON-LD. React hydrates over the static markup.

**Assets.** Vite emits hashed, immutable chunks. `three.js` and the three lab
PoCs are separate lazy chunks, so they are never part of first paint:

| Chunk | Size | Loaded |
|---|---|---|
| `index-*.js` | ~330 kB | always |
| `index-*.css` | ~43 kB | always |
| `WebGLBackground-*.js` | ~824 kB | only after interaction, desktop + no reduced-motion + no save-data |
| `PipelinePoc` / `ScadaPoc` / `TerminalPoc` | 5–10 kB each | on `/lab` interaction |

**Fonts.** Self-hosted `.woff2` (Inter, Space Grotesk, JetBrains Mono, Fraunces),
above-the-fold faces preloaded, no Google Fonts request.

**Discoverability.** Person/ProfilePage/WebSite JSON-LD entity graph,
`llms.txt` + `llms-full.txt`, `sitemap.xml` + `sitemap-index.xml`, `robots.txt`
that explicitly allows GPTBot/ClaudeBot/PerplexityBot/CCBot, IndexNow key file,
Search Console verification file, `<noscript>` full-text fallback.

**Backend (new).** `public/api/` ships with every build:

| File | Purpose |
|---|---|
| `api/contact.php` | `POST /api/contact` — validates, rate-limits, stores, emails |
| `api/health.php` | `GET /api/health` — proves PHP + storage are healthy |
| `api/.htaccess` | no listing, no-store, deny data files |

Storage is SQLite at `<domain>/private/contact.sqlite`, **outside** the document
root, created with mode 0700. No database password, SMTP credential or API key
exists in this repository or in any deployed file. Notification mail goes to
`ceo@megnitoo.com` via `mail()` with the visitor as `Reply-To`.

The same endpoint is the network's shared intake. `rtxzone`, `liquid`,
`megnitoocorporate` and `megnitoo.blog` post to it cross-origin from an
explicit HTTPS allowlist (`*.sajidafridi.com`, `megnitoo.com`, `megnitoo.blog`)
and tag each submission with `source`, so the notification subject reads
*"New contact form submission — liquid.sajidafridi.com"*. Preflight `OPTIONS`
is answered with a 24-hour max-age; unknown origins get `403`.

Controls: POST-only, 16 kB body cap, honeypot field, per-IP limit of 5/hour and
a global 60/hour ceiling, control-character stripping, `FILTER_VALIDATE_EMAIL`,
prepared statements, IP stored only as a salted SHA-256.

**Headers.** HSTS, `nosniff`, `SAMEORIGIN`, Referrer-Policy, Permissions-Policy,
and a CSP with **no `'unsafe-inline'` for scripts**: `scripts/prerender.mjs`
hashes every inline script (viewport fix + all JSON-LD blocks) and injects the
`sha256-…` list into `dist/.htaccess`. The build fails if the placeholder is
missing or any hash is unaccounted for. `script-src-attr 'none'`,
`object-src 'none'`, `frame-src 'none'`, `form-action 'self'`.

**Caching.** Hashed `js|css|woff2|png|svg|ico` → 1 year immutable. HTML → 0s,
must-revalidate. API → no-store.

## 4. Subdomain apps (static Vite)

All nine Vite subdomains follow the same pattern:

- GitHub repo → Hostinger Node 22 build → `dist/` → own document root
- single-page app, hashed `assets/`, `robots.txt`, `sitemap.xml`, `llms.txt`
- no server runtime, no database, no environment variables
- three builds each, all `completed`; last network-wide deploy 2026-10-17

Differences worth knowing:

- **rtx** ships Rapier (WASM) and Web Audio — the heaviest client of the group.
- **liquid** and **rtx** are WebGL showcases; both are desktop-first experiences.
- **advanzo** carries an unused `server.cjs` + sourcemap in the web root.
- **megnitoocorporate** is the only one with a Search Console verification file
  besides the primary site.
- None of them set a CSP; they rely on default headers only.

## 5. megnitoo.blog (the only long-running server)

```
GitHub Mrww305/Front- @ main
        │
        ▼
hbuilds/current/nodejs  ·  server.js  ·  Node 22
        │
        ▼
Passenger (LiteSpeed) → 0.0.0.0:3000
```

`.htaccess` wires Passenger: `PassengerAppRoot`, `PassengerStartupFile server.js`,
`PassengerNodejs /opt/alt/alt-nodejs22/root/bin/node`, plus a preload timestamp
hook. It is the only property with a process that can hold state between
requests, and the only one whose runtime logs matter operationally. It
restarted three times in the last day (normal Passenger recycling, no errors).

## 6. Horizons properties

`megnitoo.com` and `mediumslateblue-bison-917934.hostingersite.com` are built and
hosted by Hostinger Horizons (AI builder). They have no repository, no build
pipeline and no file-level access from this account — edits happen in the
Horizons editor and are published from there.

## 7. Known gaps

1. **Single point of failure.** Fourteen properties share one shared-hosting
   account. There is no staging environment, so every push to `main` deploys
   production immediately for whichever repo it belongs to.
2. **Duplicate deployment.** `worldwidedigital.sajidafridi.com` rebuilds the same
   repo as the primary site; two builds for one commit.
3. **insightedge.blog** has mail but no site.
4. **advanzo** exposes an SSR bundle and sourcemap in the web root.
5. **No backups verified.** Hostinger offers them, but nothing here proves a
   restore path for the SQLite contact store or the site files.
6. **Only the primary site has a backend.** Every other property is read-only
   static or a managed page.
