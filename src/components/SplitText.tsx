"use client";

import { createElement, useEffect, useRef, useState, type ElementType } from "react";

/* ------------------------------------------------------------------ */
/*  SplitText — cinematic blur-to-focus split-text reveal              */
/*  hidden:  opacity 0 · blur(0.32em) · +Y offset                      */
/*  show:    staggered timeline resolving to opacity 1 · blur(0) · y0  */
/* ------------------------------------------------------------------ */

export type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: "chars" | "words";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: string;
  blur?: string;
  trigger?: "mount" | "view";
};

export default function SplitText(props: SplitTextProps) {
  const text = props.text;
  const as = props.as ?? "span";
  const className = props.className;
  const mode = props.mode ?? "chars";
  const delay = props.delay ?? 0;
  const stagger = props.stagger ?? 0.034;
  const duration = props.duration ?? 0.9;
  const y = props.y ?? "0.42em";
  const blur = props.blur ?? "0.32em";
  const trigger = props.trigger ?? "view";
  
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(trigger === "mount");

  const units = mode === "words" ? text.split(" ") : Array.from(text);

  useEffect(() => {
    if (trigger !== "view" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-8% 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [trigger]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : `translateY(${y})`,
            filter: isVisible ? "blur(0em)" : `blur(${blur})`,
            transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1), filter ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
            transitionDelay: `${delay + i * stagger}s`,
          }}
        >
          {unit === " " ? "\u00A0" : unit}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  ScrambleText — decode/cipher reveal for handles & code strings     */
/* ------------------------------------------------------------------ */

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

export function ScrambleText(props: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const text = props.text;
  const className = props.className;
  const speed = props.speed ?? 34;
  const delay = props.delay ?? 200;
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const outputState = useState<string>("\u00A0");
  const output = outputState[0];
  const setOutput = outputState[1];

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-40px 0px" }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let frame = 0;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const locked = Math.floor(frame / 2.2);
        if (locked >= text.length) {
          setOutput(text);
          if (interval) clearInterval(interval);
          return;
        }
        let next = "";
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          if (ch === " ") next += " ";
          else if (i < locked) next += ch;
          else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOutput(next);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, isVisible, setOutput]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
