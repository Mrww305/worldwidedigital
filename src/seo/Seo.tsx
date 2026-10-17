"use client";

/* Client-side head manager.
   The first paint already has correct tags (injected at build time by
   scripts/prerender.mjs); this keeps them correct when navigating between
   routes without a full page load. */

import { useEffect } from "react";
import { useRouter } from "../router";
import { routeMeta, SITE_ORIGIN } from "./routes";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function Seo() {
  const { path } = useRouter();

  useEffect(() => {
    const meta = routeMeta(path);
    const url = `${SITE_ORIGIN}${meta.path === "/" ? "/" : `${meta.path}/`}`;

    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertLink("canonical", url);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#person` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement:
          meta.path === "/"
            ? [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` }]
            : [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: meta.navLabel,
                  item: url,
                },
              ],
      },
    };

    let script = document.getElementById("route-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "route-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [path]);

  return null;
}
