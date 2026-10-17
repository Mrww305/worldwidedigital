"use client";

import { Link } from "../router";
import { ROUTES, routeHref } from "../seo/routes";
import { IDENTITY } from "../data/cv";

/* Global footer: every route is linked from every page, which gives
   crawlers a shallow crawl depth and keeps the site graph fully connected. */
export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="font-mono text-[13px] font-medium tracking-[0.22em] text-ink transition-colors hover:text-signal"
            >
              SA<span className="text-signal">—</span>mrww305
            </Link>
            <p className="mt-4 max-w-sm font-body text-[13px] font-light leading-relaxed text-dim">
              AI Governance Architect, MLOps &amp; Zero Trust Architect.
              Lahore / Khyber Pakhtunkhwa, Pakistan — global remote.
            </p>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="mt-5 inline-block font-mono text-[11px] tracking-[0.18em] text-dim transition-colors hover:text-signal"
            >
              {IDENTITY.email}
            </a>
          </div>

          <nav className="md:col-span-4" aria-label="Footer">
            <p className="mb-4 font-mono text-[9.5px] tracking-[0.3em] text-faint">SECTIONS</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <Link
                    to={routeHref(route)}
                    className="font-mono text-[10.5px] tracking-[0.2em] text-dim transition-colors hover:text-signal"
                  >
                    {route.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[9.5px] tracking-[0.3em] text-faint">CHANNELS</p>
            <ul className="space-y-2.5">
              {[
                { label: "LinkedIn", url: "https://www.linkedin.com/in/mr305afridi" },
                { label: "GitHub", url: "https://github.com/Mrww305" },
                { label: "Kaggle", url: "https://www.kaggle.com/mrww305" },
              ].map((channel) => (
                <li key={channel.url}>
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10.5px] tracking-[0.2em] text-dim transition-colors hover:text-signal"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[9.5px] tracking-[0.22em] text-faint md:flex-row md:items-center md:justify-between">
          <p>© 2026 SAJID AFRIDI (mrww305)</p>
          <p>LAHORE · KP · GLOBAL REMOTE</p>
        </div>
      </div>
    </footer>
  );
}
