/* Build-time static generation.
 *
 * 1. Reads the Vite-built dist/index.html shell.
 * 2. Renders every route to HTML with react-dom/server.
 * 3. Rewrites title / description / canonical / OG / Twitter tags per route.
 * 4. Writes dist/<route>/index.html (and a flat <route>.html for servers that
 *    resolve clean URLs that way), so crawlers get real per-route HTML.
 * 5. Regenerates sitemap.xml + sitemap-index.xml from the same route list.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const templatePath = path.join(dist, "index.html");

const { render, ROUTES, SITE_ORIGIN } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const template = fs.readFileSync(templatePath, "utf8");

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const replaceOrThrow = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label}`);
  return html.replace(pattern, replacement);
};

const routeUrl = (route) => `${SITE_ORIGIN}${route.path === "/" ? "/" : `${route.path}/`}`;

const jsonLdFor = (route) => {
  const url = routeUrl(route);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#person` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement:
        route.path === "/"
          ? [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` }]
          : [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
              { "@type": "ListItem", position: 2, name: route.navLabel, item: url },
            ],
    },
  };
};

const buildPage = (route) => {
  const url = routeUrl(route);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  let html = template;

  html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, "title");

  html = replaceOrThrow(
    html,
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${description}" />`,
    "meta description"
  );

  html = replaceOrThrow(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
    "canonical"
  );

  html = replaceOrThrow(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${title}" />`,
    "og:title"
  );

  html = replaceOrThrow(
    html,
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
    "og:description"
  );

  html = replaceOrThrow(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
    "og:url"
  );

  html = replaceOrThrow(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`,
    "twitter:title"
  );

  html = replaceOrThrow(
    html,
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`,
    "twitter:description"
  );

  // Inline the rendered application markup.
  const rendered = render(route.path);
  html = replaceOrThrow(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${rendered}</div>`,
    "root container"
  );

  // Framer Motion writes entrance states (opacity:0, translateY(...), blur)
  // into the SSR markup. Strip those inline styles so the prerendered text is
  // visible to crawlers and no-JS visitors instead of waiting for hydration.
  html = html.replace(/\sstyle="[^"]*(?:opacity:\s*0|translateY|blur\()[^"]*"/g, "");

  // The home-only noscript fallback would duplicate the wrong content on
  // sub-pages; the prerendered #root already covers no-JS visitors.
  if (route.path !== "/") {
    html = html.replace(
      /\s*<!-- Noscript fallback for LLM crawlers and no-JS users -->[\s\S]*?<\/noscript>/,
      ""
    );
  }

  const jsonLd = `  <script type="application/ld+json">\n${JSON.stringify(
    jsonLdFor(route),
    null,
    2
  )
    .split("</")
    .join("<\\/")}\n  </script>\n`;

  html = html.replace("</head>", `${jsonLd}</head>`);

  return html;
};

for (const route of ROUTES) {
  const html = buildPage(route);
  const dir = route.path === "/" ? dist : path.join(dist, route.path);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);

  if (route.path !== "/") {
    fs.writeFileSync(path.join(dist, `${route.path}.html`), html);
  }

  console.log(`prerendered ${route.path} (${(html.length / 1024).toFixed(1)} kB)`);
}

/* ---- sitemap ---- */
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(
  (route) =>
    `  <url>\n    <loc>${routeUrl(route)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
).join("\n");

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

fs.writeFileSync(
  path.join(dist, "sitemap-index.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_ORIGIN}/sitemap.xml</loc>\n    <lastmod>${today}</lastmod>\n  </sitemap>\n</sitemapindex>\n`
);

console.log(`wrote sitemap.xml (${ROUTES.length} urls) and sitemap-index.xml`);
