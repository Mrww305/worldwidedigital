# worldwidedigital — Deep Space Digital CV

A cinematic, dark-themed digital CV for **Sajid Afridi (mr305)** — AI Governance Architect, MLOps & Zero Trust Architect, Industrial Technologist, National AI Policy Strategist, Founder of MegniToo.

**Stack:** React 18 · TypeScript (strict) · Vite 6 · Tailwind CSS v4 · React Three Fiber + drei · Framer Motion 11 · Three.js r160

## Live features

- WebGL neural-starfield background (mouse-parallax camera, reduced-motion aware)
- Cinematic blur-to-focus split-text reveals + scramble-decode handle animation
- `useDynamicVH` hook — true mobile viewport, no address-bar layout jumps
- **Live PoC Lab** — three code-split, self-contained windows:
  - `zero-trust-shell` interactive terminal (12+ commands)
  - `mlops-pipeline-monitor` with drift injection → rollback → redeploy
  - `scada-batch-line-hmi` with fault injection (the 12% → 6% story)
- Full SEO: JSON-LD `Person` schema, Open Graph, Twitter Card, `robots.txt`, `sitemap.xml`

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

## Deploy: GitHub → Hostinger (automatic) ⭐

The repo ships with `.github/workflows/deploy-hostinger.yml`. On every push to `main` it:

1. `npm ci` → `npm run typecheck` → `npm run build`
2. Uploads `dist/` to Hostinger over **FTPS**.

### One-time setup

1. **Hostinger hPanel → Files → FTP Accounts** (or *Hosting → FTP*). Note the **FTP host**
   (e.g. `ftp.sajidafridi.com` or the server IP), the **FTP username** (`u…`), set an
   **FTP password**, and confirm the document root (usually `/public_html/`).
2. **GitHub → repo Settings → Secrets and variables → Actions → New repository secret**, add:

   | Secret | Example | Notes |
   | ------ | ------- | ----- |
   | `FTP_SERVER` | `ftp.sajidafridi.com` | Hostinger FTP host |
   | `FTP_USERNAME` | `u123456789` | FTP user |
   | `FTP_PASSWORD` | `••••••` | FTP password |
   | `FTP_SERVER_DIR` | `/public_html/` | Trailing slash; defaults to `/public_html/` if omitted |

3. Push to `main`, or run it manually: **Actions → Deploy to Hostinger → Run workflow**.

### Notes

- `.htaccess` (security headers, `www`→apex 301, compression, caching) lives in `public/`,
  is copied into `dist/`, and therefore deploys automatically.
- The deploy is **incremental** — it uploads only changed files and does **not** delete
  existing ones (old hashed assets may accumulate harmlessly). For a clean slate set
  `dangerous-clean-slate: true` in the workflow (⚠ wipes the target directory first).
- If the account only supports plain FTP, change `protocol: ftps` → `protocol: ftp`.
- Prefer SFTP/SSH? Replace the last step with `wlixcc/SFTP-Deploy-Action` using the same secrets.

### Alternative: Hostinger native Git deploy

hPanel → **Advanced → GIT** can pull this repo directly and run
`npm install && npm run build`, publishing `dist/`. No GitHub secrets needed, but the build
then runs on Hostinger's Node version rather than GitHub Actions.

---

## Deploy: GitHub → Vercel (alternative)

1. Push this repo to GitHub (`git add -A && git commit -m "init" && git push`).
2. On Vercel: **Add New… → Project → Import** the repository.
3. Vercel reads `vercel.json` automatically. Confirm these settings:

| Setting           | Value          |
| ----------------- | -------------- |
| Framework Preset  | **Vite**       |
| Root Directory    | *(leave empty)*|
| Build Command     | `npm run build`|
| Output Directory  | `dist`         |
| Install Command   | `npm install`  |
| Node.js Version   | 20.x or 22.x   |

4. **Deploy.** First deploy takes ~60–90 s. Every push to `main` redeploys automatically.

> `vercel.json` in this repo pins `framework: "vite"`, the build command, `outputDirectory: "dist"` and an SPA rewrite — so even a mis-detected project converges to the right config on the next deploy.

### Alternative: Vercel CLI

```bash
npm i -g vercel
vercel            # follow prompts; it detects vite + vercel.json
vercel --prod
```

## Troubleshooting: `NOT_FOUND` on Vercel

The [NOT_FOUND error](https://vercel.com/docs/errors/not_found) means Vercel had no route to serve for the requested path. For this static Vite app the causes — in order of likelihood — are:

1. **Wrong Framework Preset.** If the project was detected/configured as *Next.js* or *Other*, Vercel looks for server output (`.next/`, API functions) that a static Vite build never produces. Fix: Project → Settings → General → Framework Preset → **Vite**, then **Redeploy** (Deployments → ⋯ → Redeploy — a fresh deploy, not just a new commit).
2. **Wrong Output Directory.** It must be `dist`. If it was blank or `.next`, Vercel serves nothing. `vercel.json` now pins this.
3. **Wrong Root Directory / branch.** Root Directory must be empty (repo root is the app), Production Branch must be the branch you push (default `main`).
4. **`dist/` or `node_modules/` committed by accident.** A stale committed `dist/` can shadow the fresh build. `.gitignore` now prevents this — run `git rm -r --cached dist node_modules` if they were ever committed.
5. **Deep-linking an SPA path.** Any client-routed path 404s without a rewrite. The `rewrites` rule in `vercel.json` sends everything to `/index.html`.

### Sanity check after deploy

- `https://<your-app>.vercel.app/robots.txt` → should return the robots file (proves static serving works).
- `https://<your-app>.vercel.app/favicon.svg` → the 305 mark.
- View page source → JSON-LD `application/ld+json` block present.

### After go-live

Replace the placeholder domain (`sajidafridi.com`) in `public/robots.txt` and `public/sitemap.xml`, and add the custom domain under Project → Settings → Domains.

## Project structure

```
vercel.json              # deployment contract (framework, build, output, rewrites)
index.html               # SEO: JSON-LD Person schema, OG/Twitter, pre-paint --vh
public/                  # robots.txt · sitemap.xml · llms.txt · 404.html · .htaccess
                         # og-image.png · favicon.svg/ico · apple-touch-icon.png
src/
  App.tsx                # composition root (MotionConfig + reduced-motion)
  hooks/useDynamicVH.ts  # true-viewport CSS variable
  data/cv.ts             # single source of truth for all CV data
  components/            # Nav · Hero · SplitText · WebGLBackground · sections…
    pocs/                # lazy-loaded PoC windows (own chunks)
```
