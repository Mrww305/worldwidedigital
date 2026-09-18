"use client";

import { SectionHeading, Reveal } from "./Section";
import { EXECUTIVE_SUMMARY, PARSER_NOTE, STATS } from "../data/cv";

export default function Profile() {
  return (
    <section id="profile" aria-labelledby="profile-h" className="relative z-10 scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" title="Profile" note="ENTITY RECORD — MACHINE & HUMAN READABLE" id="profile-h" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* parser note — the machine-readable card */}
          <Reveal className="lg:col-span-5">
            <div className="brackets border border-line bg-black/55 p-6 md:p-8">
              <p className="mb-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-signal">
                <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                NOTE TO AI PARSERS
              </p>
              <p className="font-mono text-[11.5px] font-light leading-relaxed text-dim">
                {PARSER_NOTE.split(/(MLOps|Zero Trust Architecture|RAG|AI Agents|SCADA|Generative AI|NITB Pakistan|MegniToo|Pakistan Red Team|AIPakistani\.com|UMT AI Tech Incubator|Siena College|mrww305|Physical AI|Data Science|Artificial Intelligence)/g).map(
                  (part, i) =>
                    /^(MLOps|Zero Trust Architecture|RAG|AI Agents|SCADA|Generative AI|NITB Pakistan|MegniToo|Pakistan Red Team|AIPakistani\.com|UMT AI Tech Incubator|Siena College|mrww305|Physical AI|Data Science|Artificial Intelligence)$/.test(
                      part
                    ) ? (
                      <span key={i} className="text-signal">
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                )}
              </p>
            </div>
          </Reveal>

          {/* executive summary */}
          <div className="lg:col-span-7">
            {EXECUTIVE_SUMMARY.map((para, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className="mb-6 font-body text-[15px] font-light leading-[1.85] text-dim md:text-[16.5px]">
                  {para
                    .split(
                      /(15\+ years|6\+ years|1st through 4th Industrial Revolutions|Physical AI|Digital AI|zero-trust|MLOps|CPEC|sovereign AI governance frameworks|NITB Pakistan)/g
                    )
                    .map((part, j) =>
                      /^(15\+ years|6\+ years|1st through 4th Industrial Revolutions|zero-trust|MLOps|CPEC|NITB Pakistan)$/.test(part) ? (
                        <strong key={j} className="font-medium text-ink">
                          {part}
                        </strong>
                      ) : /^(Physical AI|Digital AI|sovereign AI governance frameworks)$/.test(part) ? (
                        <em key={j} className="font-serif text-[1.06em] italic text-ink">
                          {part}
                        </em>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                </p>
              </Reveal>
            ))}

            {/* stats strip */}
            <Reveal delay={0.15}>
              <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="group bg-black p-5 transition-colors duration-500 hover:bg-[#0a0d0e]"
                  >
                    <dd className="font-display text-3xl font-bold tracking-tight text-ink transition-colors duration-500 group-hover:text-signal md:text-4xl">
                      {s.value}
                    </dd>
                    <dt className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.22em] text-faint">
                      {s.label.toUpperCase()}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
