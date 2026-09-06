"use client";

import { SectionHeading, Reveal } from "./Section";
import { ROLES } from "../data/cv";

const HIGHLIGHT_RE =
  /(12% to 6%|50% reduction|PKR 300 Million|80% sales recovery|National Artificial Intelligence \(AI\) Policy 2025|SCADA|Zero Trust|Generative AI|Multi-Agent Systems|prompt injection|M2C|OT\/IT|CPEC|Pakistan's first|Pakistan's premier)/g;

const IS_HIGHLIGHT =
  /^(12% to 6%|50% reduction|PKR 300 Million|80% sales recovery|National Artificial Intelligence \(AI\) Policy 2025|SCADA|Zero Trust|Generative AI|Multi-Agent Systems|prompt injection|M2C|OT\/IT|CPEC|Pakistan's first|Pakistan's premier)$/;

function Bullet({ text }: { text: string }) {
  const parts = text.split(HIGHLIGHT_RE);
  return (
    <li className="flex gap-3 py-1 font-body text-[13.5px] font-light leading-relaxed text-dim md:text-sm">
      <span className="mt-[7px] h-1 w-1 shrink-0 bg-signal/70" aria-hidden="true" />
      <span>
        {parts.map((part, i) =>
          IS_HIGHLIGHT.test(part) ? (
            <strong key={i} className="font-medium text-ink">
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="missions" aria-labelledby="missions-h" className="relative z-10 scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        {/* sticky rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading index="03" title="Mission Log" note="PROFESSIONAL EXPERIENCE" id="missions-h" />
            <Reveal>
              <p className="max-w-sm font-body text-sm font-light leading-[1.85] text-dim">
                Fifteen years across four industrial revolutions — from the loom floor of a textile
                group to national AI policy. Every mission shipped with the same doctrine:{" "}
                <em className="font-serif italic text-ink">build systems that outlive their builders.</em>
              </p>
              <div className="mt-8 space-y-3 font-mono text-[10px] tracking-[0.24em] text-faint">
                <p><span className="text-signal">▸</span> 07 COMMAND ASSIGNMENTS</p>
                <p><span className="text-signal">▸</span> 03 CURRENT FOUNDER / C-LEVEL SEATS</p>
                <p><span className="text-signal">▸</span> 05 INTERNATIONAL MARKETS</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* entries */}
        <div className="lg:col-span-8">
          {ROLES.map((role, i) => (
            <Reveal key={role.id} delay={Math.min(i * 0.04, 0.15)}>
              <article className="group relative border-t border-line py-9 pl-0 transition-all duration-500 hover:pl-4 md:py-11">
                <span
                  className="absolute left-0 top-0 h-full w-px scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-signal">{role.period}</span>
                  <span className="font-mono text-[9px] tracking-[0.26em] text-faint">{role.tag}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                  {role.title}
                </h3>
                <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3">
                  {role.orgUrl ? (
                    <a
                      href={role.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-lg italic text-ink underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                    >
                      {role.org}
                    </a>
                  ) : (
                    <span className="font-serif text-lg italic text-ink">{role.org}</span>
                  )}
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                    ⌖ {role.where}
                  </span>
                </p>

                <ul className="mt-4 max-w-2xl">
                  {role.bullets.map((b, j) => (
                    <Bullet key={j} text={b} />
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
