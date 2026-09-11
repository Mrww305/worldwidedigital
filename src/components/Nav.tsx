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
          SA<span className="text-signal">—</span>MRWW305
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

        <a
          href="#uplink"
          className="pointer-events-auto flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.24em] text-dim transition-all hover:border-signal/60 hover:text-signal md:hidden"
        >
          <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          UPLINK
        </a>
        <div className="pointer-events-none hidden items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-faint md:flex">
          <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          ONLINE
        </div>
      </div>
    </motion.header>
  );
}
