"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "profile", label: "PROFILE", n: "01" },
  { id: "arsenal", label: "ARSENAL", n: "02" },
  { id: "missions", label: "MISSIONS", n: "03" },
  { id: "lab", label: "LIVE LAB", n: "04" },
  { id: "uplink", label: "UPLINK", n: "05" },
];

export default function Nav() {
  const scrolledState = useState(false);
  const scrolled = scrolledState[0];
  const setScrolled = scrolledState[1];
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 animate-[slideDown_0.9s_ease-out_0.15s_both]"
      style={{
        animation: 'slideDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both'
      }}
    >
      {/* scroll progress hairline */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-signal transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
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
    </header>
  );
}
