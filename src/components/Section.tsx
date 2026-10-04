"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

/* Line-mask reveal used for every section heading. */
export function SectionHeading(props: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  const index = props.index;
  const title = props.title;
  const note = props.note;
  const id = props.id;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="mb-12 md:mb-16">
      <div
        className={`mb-3 flex items-center gap-4 font-mono text-[10px] tracking-[0.34em] text-signal transition-opacity duration-800 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>[ {index} ]</span>
        <span
          className={`h-px w-16 origin-left bg-line transition-transform duration-1100 ${
            isVisible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ transitionDelay: "0.15s" }}
        />
        {note ? <span className="text-faint">{note}</span> : null}
      </div>
      <h2 id={id} className="overflow-hidden">
        <span
          className={`block font-display text-[clamp(2.2rem,6vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-ink transition-transform duration-1000 ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          {title}
        </span>
      </h2>
    </div>
  );
}

/* Generic scroll-reveal wrapper. */
export function Reveal(props: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const children = props.children;
  const delay = props.delay ?? 0;
  const y = props.y ?? 26;
  const className = props.className;
  const revealRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-8% 0px" }
    );

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={revealRef}
      className={`transition-all duration-900 ${className ?? ""} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}s`,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
