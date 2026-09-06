"use client";

import { motion } from "framer-motion";
import SplitText, { ScrambleText } from "./SplitText";
import { IDENTITY, LINKS } from "../data/cv";

const READOUTS = [
  { k: "EXPERIENCE", v: "15+ YRS" },
  { k: "AI FOCUS", v: "6+ YRS" },
  { k: "INDUSTRIAL REV", v: "1 → 4" },
  { k: "ZTNA", v: "ACTIVE" },
  { k: "K8S ORCH", v: "CKA" },
];

export default function Hero() {
  return (
    <header
      id="top"
      className="vh-screen pointer-events-none relative flex flex-col justify-between overflow-hidden px-5 pb-6 pt-24 md:px-10 md:pb-8"
    >
      {/* ---------------- top telemetry strip ---------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="flex items-center justify-between font-mono text-[10px] tracking-[0.26em] text-faint"
      >
        <span>
          {IDENTITY.coords}
          <span className="hidden text-dim sm:inline"> · LAHORE / KP / GLOBAL REMOTE</span>
        </span>
        <span className="hidden items-center gap-2 md:flex">
          <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          SYSTEM NOMINAL — 15Y UPTIME
        </span>
      </motion.div>

      {/* ---------------- central identity block ---------------- */}
      <div className="grid flex-1 content-end gap-8 pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.3em] text-dim"
          >
            <span className="text-signal">◉</span>
            OPERATOR HANDLE //
            <ScrambleText text="mr305" className="text-ink" delay={700} />
            <span className="text-faint">— TRANSMISSION v4.0</span>
          </motion.p>

          <h1 className="font-display font-bold leading-[0.86] tracking-[-0.045em] text-ink">
            <SplitText
              text="SAJID"
              as="span"
              trigger="mount"
              delay={0.25}
              stagger={0.07}
              className="block text-[clamp(3.6rem,15vw,11.5rem)]"
            />
            <SplitText
              text="AFRIDI"
              as="span"
              trigger="mount"
              delay={0.62}
              stagger={0.07}
              className="block text-[clamp(3.6rem,15vw,11.5rem)]"
            />
          </h1>

          {/* role manifest */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 1.15 } },
            }}
            className="mt-7 flex max-w-3xl flex-col gap-1.5"
          >
            {IDENTITY.roles.map((r) => (
              <motion.li
                key={r.n}
                variants={{
                  hidden: { opacity: 0, x: -18, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex items-baseline gap-3"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-signal/80">{r.n}</span>
                {r.serif ? (
                  <span className="font-serif text-lg italic tracking-wide text-ink md:text-xl">
                    {r.label}
                  </span>
                ) : (
                  <span className="font-display text-sm font-light uppercase tracking-[0.24em] text-dim md:text-base">
                    {r.label}
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* right telemetry column */}
        <motion.dl
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="hidden w-44 flex-col gap-4 border-l border-line pl-5 lg:flex"
        >
          {READOUTS.map((r) => (
            <div key={r.k}>
              <dt className="font-mono text-[9px] tracking-[0.3em] text-faint">{r.k}</dt>
              <dd className="font-display text-sm font-medium tracking-[0.14em] text-ink">
                {r.v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* ---------------- bottom strip ---------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="flex items-end justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="cue-drop absolute inset-0 bg-signal" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.32em] text-faint">
            SCROLL TO DECRYPT
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {LINKS.slice(0, 4).map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/70 hover:text-signal"
            >
              {l.id}
            </a>
          ))}
          <a
            href={`mailto:${IDENTITY.email}`}
            className="ml-2 hidden font-mono text-[10px] tracking-[0.18em] text-dim transition-colors hover:text-signal sm:inline"
          >
            {IDENTITY.email}
          </a>
        </div>
      </motion.div>
    </header>
  );
}
