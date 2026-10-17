"use client";

import type { ReactNode } from "react";

/* Shared page header for every route except the home hero.
   Deliberately static (no entrance animation) so the H1 is painted
   immediately and is fully visible in prerendered HTML. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative z-10 px-5 pb-2 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 font-mono text-[10px] tracking-[0.34em] text-signal">
          [ {eyebrow} ]
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(2.4rem,7vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-ink">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl font-body text-[15px] font-light leading-[1.85] text-dim md:text-base">
          {intro}
        </p>
        {children}
      </div>
    </header>
  );
}
