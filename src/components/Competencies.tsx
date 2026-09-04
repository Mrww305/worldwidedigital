"use client";

import { SectionHeading, Reveal } from "./Section";
import { COMPETENCIES } from "../data/cv";

export default function Competencies() {
  return (
    <section id="arsenal" aria-labelledby="arsenal-h" className="relative z-10 scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="02" title="Arsenal" note="CORE TECHNICAL COMPETENCIES — INDEXED FOR SEMANTIC MATCHING" id="arsenal-h" />

        <div className="border-t border-line">
          {COMPETENCIES.map((domain, i) => (
            <Reveal key={domain.id} delay={i * 0.05}>
              <article className="group grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-ink/[0.025] md:grid-cols-12 md:items-start md:gap-8 md:py-10">
                <div className="flex items-baseline gap-4 md:col-span-1">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-signal">{domain.index}</span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-[0.04em] text-ink transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                    {domain.title}
                  </h3>
                  <p className="mt-2 font-serif text-[15px] italic leading-relaxed text-dim">
                    {domain.note}
                  </p>
                </div>

                <ul className="flex flex-wrap content-start gap-2 md:col-span-7">
                  {domain.skills.map((skill) => (
                    <li key={skill}>
                      <span className="inline-block cursor-default border border-line px-2.5 py-1.5 font-mono text-[10px] font-light tracking-[0.12em] text-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/70 hover:text-signal">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-[10px] tracking-[0.26em] text-faint">
            46 SYSTEMS INDEXED · OPTIMIZED FOR AI SEARCH & KNOWLEDGE-GRAPH EXTRACTION
          </p>
        </Reveal>
      </div>
    </section>
  );
}
