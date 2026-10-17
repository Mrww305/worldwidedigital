"use client";

import { Link } from "../router";
import { NAV_ROUTES, routeHref } from "../seo/routes";
import { Reveal } from "./Section";

const BLURBS: Record<string, string> = {
  "/about": "Executive summary, measurable outcomes and the technical arsenal.",
  "/experience": "Seven command assignments, education and certifications.",
  "/projects": "Live deployments, open-source AI infrastructure and experiments.",
  "/lab": "Three interactive proofs of concept running in the browser.",
  "/contact": "Direct channels for executive, consulting and policy work.",
};

/* Landing index: the single-page CV is now split into dedicated, indexable
   routes. These cards are the entry points. */
export default function RouteIndex() {
  return (
    <section
      aria-labelledby="dossier-h"
      className="relative z-10 px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <h2
            id="dossier-h"
            className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold uppercase tracking-[-0.02em] text-ink"
          >
            Dossier
          </h2>
          <p className="font-mono text-[10px] tracking-[0.3em] text-faint">
            FIVE SECTIONS — FULL RECORD
          </p>
        </div>

        <ul className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {NAV_ROUTES.map((route, index) => (
            <li key={route.path} className="bg-black">
              <Reveal className="h-full" delay={index * 0.04}>
                <Link
                  to={routeHref(route)}
                  className="group flex h-full flex-col gap-4 p-7 transition-colors duration-500 hover:bg-[#080b0c] md:p-8"
                >
                  <span className="flex items-center justify-between font-mono text-[10px] tracking-[0.28em] text-signal">
                    {route.navNumber}
                    <span aria-hidden="true" className="text-faint transition-colors group-hover:text-signal">
                      ↗
                    </span>
                  </span>
                  <span className="font-display text-xl font-semibold uppercase tracking-[0.03em] text-ink md:text-2xl">
                    {route.navLabel}
                  </span>
                  <span className="font-body text-[13.5px] font-light leading-relaxed text-dim">
                    {BLURBS[route.path]}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}

          <li className="bg-black">
            <Reveal className="h-full" delay={0.2}>
              <a
                href="https://github.com/Mrww305"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-4 p-7 transition-colors duration-500 hover:bg-[#080b0c] md:p-8"
              >
                <span className="flex items-center justify-between font-mono text-[10px] tracking-[0.28em] text-signal">
                  06
                  <span aria-hidden="true" className="text-faint transition-colors group-hover:text-signal">
                    ↗
                  </span>
                </span>
                <span className="font-display text-xl font-semibold uppercase tracking-[0.03em] text-ink md:text-2xl">
                  Source
                </span>
                <span className="font-body text-[13.5px] font-light leading-relaxed text-dim">
                  GitHub — repositories, agents and MLOps tooling.
                </span>
              </a>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
