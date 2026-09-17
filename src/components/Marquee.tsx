"use client";

import { useEffect, useRef, useState } from "react";
import { MARQUEE_KEYWORDS } from "../data/cv";

function Track({ reverse, className }: { reverse?: boolean; className?: string }) {
  const row = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS];
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const [useJS, setUseJS] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Detect if CSS animation is actually running
    // On some mobile browsers, animations get throttled/stopped
    const checkAnimation = () => {
      const computedStyle = window.getComputedStyle(track);
      const animationName = computedStyle.animationName;
      const animationPlayState = computedStyle.animationPlayState;

      // If CSS animation is not available or paused, switch to JS
      if (!animationName || animationName === "none" || animationPlayState === "paused") {
        setUseJS(true);
      }
    };

    // Check after a short delay to let CSS animation initialize
    const timeout = setTimeout(checkAnimation, 100);

    // Also check when page becomes visible (mobile browsers pause animations when hidden)
    const handleVisibility = () => {
      if (document.hidden) return;
      // Re-check animation state when page becomes visible
      const computedStyle = window.getComputedStyle(track);
      const animationPlayState = computedStyle.animationPlayState;
      if (animationPlayState === "paused") {
        // Force restart CSS animation by toggling class
        track.style.animation = "none";
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        track.offsetHeight; // force reflow
        track.style.animation = "";
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!useJS) return;
    const track = trackRef.current;
    if (!track) return;

    // Disable CSS animation when using JS fallback
    track.style.animation = "none";

    const speed = reverse ? 0.8 : 1.0;
    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      if (reverse) {
        positionRef.current += speed;
        if (positionRef.current >= totalWidth) {
          positionRef.current = 0;
        }
      } else {
        positionRef.current -= speed;
        if (positionRef.current <= -totalWidth) {
          positionRef.current = 0;
        }
      }
      track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [useJS, reverse]);

  return (
    <div className="overflow-hidden border-y border-line py-2.5">
      <div
        ref={trackRef}
        className={`marquee-inner flex w-max items-center whitespace-nowrap ${
          reverse ? "marquee-track-rev" : "marquee-track"
        } ${className ?? ""}`}
      >
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex shrink-0 items-center">
            <span className="px-6 font-mono text-[11px] font-medium tracking-[0.4em] text-dim inherit-color">
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
      <Track reverse className="text-marquee-secondary" />
    </section>
  );
}
