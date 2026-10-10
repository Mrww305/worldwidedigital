"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const NAV_LINKS = [
  { id: "profile", label: "PROFILE", n: "01" },
  { id: "arsenal", label: "ARSENAL", n: "02" },
  { id: "missions", label: "MISSIONS", n: "03" },
  { id: "lab", label: "LIVE LAB", n: "04" },
  { id: "uplink", label: "UPLINK", n: "05" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(window.scrollY > 32);
    void v;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-signal"
        style={{ scaleX: scrollYProgress }}
      />
      <div
        className={`flex items-center justify-between px-5 py-4 transition-all duration-500 md:px-10 ${
          scrolled
            ? "border-b border-line bg-black/72 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="pointer-events-auto font-mono text-[13px] font-medium tracking-[0.22em] text-ink transition-colors hover:text-signal"
        >
          SA<span className="text-signal">—</span>mrww305
          <span className="ml-3 hidden text-[10px] font-light tracking-[0.3em] text-faint sm:inline">
            DEEP SPACE CV
          </span>
        </a>

        <nav className="pointer-events-auto hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group font-mono text-[10px] tracking-[0.28em] text-dim transition-colors hover:text-ink"
            >
              <span className="mr-1.5 text-signal/70 transition-colors group-hover:text-signal">
                {l.n}
              </span>
              {l.label}
              <span className="block h-px max-w-0 bg-signal transition-all duration-500 group-hover:max-w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#uplink"
            className="pointer-events-auto hidden items-center gap-2 border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.24em] text-dim transition-all hover:border-signal/60 hover:text-signal md:flex"
          >
            <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            UPLINK
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="pointer-events-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line md:hidden"
          >
            <span
              className={`block h-px w-4 bg-ink transition-all duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-4 bg-ink transition-all duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>

          <div className="pointer-events-none hidden items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-faint md:flex">
            <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            ONLINE
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-line bg-black/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-3 border-b border-line/50 py-3.5 font-mono text-[11px] tracking-[0.28em] text-dim transition-colors last:border-b-0 hover:text-ink"
            >
              <span className="text-signal/70 transition-colors group-hover:text-signal">
                {l.n}
              </span>
              {l.label}
            </a>
          ))}
          <a
            href="#uplink"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center gap-2 py-3.5 font-mono text-[11px] tracking-[0.28em] text-signal"
          >
            <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            UPLINK
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
