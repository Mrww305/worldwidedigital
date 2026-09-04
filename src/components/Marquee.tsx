"use client";

import { MARQUEE_KEYWORDS } from "../data/cv";

function Track({ reverse, className }: { reverse?: boolean; className?: string }) {
  const row = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS];
  return (
    <div className="overflow-hidden border-y border-line py-2.5">
      <div
        className={`flex w-max items-center whitespace-nowrap ${
          reverse ? "marquee-track-rev" : "marquee-track"
        } ${className ?? ""}`}
      >
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span className="px-6 font-mono text-[11px] font-light tracking-[0.4em] text-dim">
              {word}
            </span>
            <span className="text-signal/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Core keywords ticker" className="relative z-10 my-0">
      <Track />
      <Track reverse className="opacity-60" />
    </section>
  );
}
