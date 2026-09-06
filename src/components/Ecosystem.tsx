"use client";

import { SectionHeading, Reveal } from "./Section";
import { CERTIFICATIONS, EDUCATION, LEADERSHIP, OPEN_TO, IDENTITY } from "../data/cv";

export default function Ecosystem() {
  return (
    <section id="ecosystem" aria-label="Ecosystem, credentials and open channels" className="relative z-10 scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* -------- ecosystem ledger -------- */}
        <SectionHeading index="05" title="Ecosystem" note="LEADERSHIP & COMMUNITY IMPACT" />
        <div className="border-t border-line">
          {LEADERSHIP.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <article className="group grid gap-2 border-b border-line py-7 transition-all duration-500 hover:bg-ink/[0.025] hover:pl-3 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="font-mono text-[10px] tracking-[0.24em] text-signal md:col-span-1">
                  E-{String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-4">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-ink">
                    {item.role}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-base italic text-ink underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                    >
                      {item.org}
                    </a>
                  ) : (
                    <p className="font-serif text-base italic text-ink">{item.org}</p>
                  )}
                  <p className="mt-1 max-w-xl font-body text-[13px] font-light leading-relaxed text-dim">
                    {item.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* -------- credentials -------- */}
        <div className="mt-24 grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading index="06" title="Credentials" note="EDUCATION" />
            <div className="border-t border-line">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.06}>
                  <article className="group border-b border-line py-6 transition-all duration-500 hover:pl-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold text-ink">{e.degree}</h3>
                      <span className="shrink-0 font-mono text-[9px] tracking-[0.22em] text-signal">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-[15px] italic text-dim">{e.school}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading index="07" title="Certified" note="VERIFIED OPERATOR CREDENTIALS" />
            <div className="border-t border-line">
              {CERTIFICATIONS.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.06}>
                  <article className="group flex items-baseline justify-between gap-4 border-b border-line py-6 transition-all duration-500 hover:pl-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{c.name}</h3>
                      <p className="mt-1 font-serif text-[15px] italic text-dim">{c.issuer}</p>
                    </div>
                    <span className="shrink-0 border border-line px-2 py-1 font-mono text-[8.5px] tracking-[0.18em] text-faint transition-colors group-hover:border-signal/60 group-hover:text-signal">
                      {c.code}
                    </span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* -------- open channels -------- */}
        <div className="mt-24">
          <SectionHeading index="08" title="Open Channels" note="CURRENTLY ACCEPTING TRANSMISSIONS" />
          <div className="border-t border-line">
            {OPEN_TO.map((o, i) => (
              <Reveal key={o.id} delay={i * 0.06}>
                <a
                  href={`mailto:${IDENTITY.email}?subject=${encodeURIComponent(`Opportunity — ${o.track}`)}`}
                  className="group grid items-baseline gap-2 border-b border-line py-8 transition-all duration-500 hover:bg-ink/[0.03] hover:pl-4 md:grid-cols-12 md:gap-8"
                >
                  <span className="font-mono text-[10px] tracking-[0.24em] text-signal md:col-span-1">
                    CH-{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-[0.02em] text-ink transition-colors group-hover:text-signal md:col-span-4 md:text-2xl">
                    {o.track}
                  </h3>
                  <p className="font-body text-[13.5px] font-light leading-relaxed text-dim md:col-span-6">
                    {o.detail}
                  </p>
                  <span
                    className="hidden font-display text-2xl text-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-signal md:col-span-1 md:block md:text-right"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
