"use client";

import { useState } from "react";
import SplitText from "./SplitText";
import { Reveal } from "./Section";
import { IDENTITY, LINKS } from "../data/cv";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${IDENTITY.email}`;
    }
  };

  return (
    <section id="uplink" aria-labelledby="uplink-h" className="relative z-10 scroll-mt-24 px-5 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.34em] text-signal">
            <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            [ 09 ] — CHANNEL OPEN · RESPONSE WINDOW &lt; 24H
          </p>
        </Reveal>

        <h2 id="uplink-h" className="font-display font-bold uppercase leading-[0.9] tracking-[-0.035em] text-ink">
          <SplitText
            text="ESTABLISH"
            as="span"
            className="block text-[clamp(2.6rem,9vw,7.5rem)]"
            stagger={0.05}
          />
          <SplitText
            text="UPLINK"
            as="span"
            delay={0.25}
            stagger={0.06}
            className="block text-[clamp(2.6rem,9vw,7.5rem)] text-transparent [-webkit-text-stroke:1.5px_rgba(232,232,232,0.55)]"
          />
        </h2>

        {/* giant email */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-5 border-y border-line py-7">
            <a
              href={`mailto:${IDENTITY.email}`}
              className="link-sweep font-display text-[clamp(1.3rem,4.2vw,3rem)] font-semibold tracking-tight text-ink transition-colors hover:text-signal"
            >
              {IDENTITY.email}
            </a>
            <button
              onClick={copyEmail}
              className="border border-line px-3 py-2 font-mono text-[10px] tracking-[0.22em] text-dim transition-all duration-300 hover:border-signal/70 hover:text-signal active:scale-95"
            >
              {copied ? "✓ COPIED TO BUFFER" : "COPY ADDRESS"}
            </button>
          </div>
        </Reveal>

        <div className="grid gap-14 py-14 lg:grid-cols-12">
          {/* direct channels */}
          <Reveal className="lg:col-span-4">
            <h3 className="mb-5 font-mono text-[10px] tracking-[0.3em] text-faint">DIRECT CHANNELS</h3>
            <ul className="space-y-4">
              <li className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-faint">PHONE</span>
                <a href={`tel:${IDENTITY.phoneHref}`} className="font-display text-base text-ink transition-colors hover:text-signal">
                  {IDENTITY.phone}
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-faint">DISCORD</span>
                <span className="font-display text-base text-ink">{IDENTITY.discord}</span>
              </li>
              <li className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-faint">BASE</span>
                <span className="text-right font-body text-[13px] font-light text-dim">{IDENTITY.location}</span>
              </li>
            </ul>
          </Reveal>

          {/* network ledger */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <h3 className="mb-5 font-mono text-[10px] tracking-[0.3em] text-faint">NETWORK NODES</h3>
            <ul className="border-t border-line">
              {LINKS.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-4 border-b border-line py-4 transition-all duration-400 hover:bg-ink/[0.03] hover:pl-3 md:gap-8"
                  >
                    <span className="font-mono text-[9px] tracking-[0.2em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-semibold uppercase tracking-[0.03em] text-ink transition-colors group-hover:text-signal md:text-xl">
                      {l.label}
                    </span>
                    <span className="hidden flex-1 border-b border-dashed border-line/70 md:block" aria-hidden="true" />
                    <span className="font-mono text-[10.5px] tracking-[0.12em] text-dim">{l.handle}</span>
                    <span
                      className="font-display text-lg text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-signal"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* footer */}
        <footer className="flex flex-col gap-4 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[9.5px] leading-relaxed tracking-[0.22em] text-faint">
            © 2026 SAJID AFRIDI (MRWW305) — LAHORE · KP · GLOBAL REMOTE
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 border border-line px-3 py-2 font-mono text-[9.5px] tracking-[0.24em] text-dim transition-all hover:border-signal/70 hover:text-signal"
          >
            ASCEND
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true">
              ↑
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
