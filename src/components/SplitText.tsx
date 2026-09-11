"use client";

import { createElement, useEffect, useRef, useState, type ElementType } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SplitText({
  text,
  as = "span",
  className,
  mode = "chars",
  delay = 0,
  stagger = 0.034,
  duration = 0.9,
  y = "0.42em",
  blur = "0.32em",
  trigger = "view",
}: SplitTextProps) {
  const reduce = useReducedMotion();

  const units =
    mode === "words" ? text.split(" ") : Array.from(text);

  if (reduce) {
    return createElement(as, { className }, text);
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y, filter: `blur(${blur})` },
    show: {
      opacity: 1,
      y: "0em",
      filter: "blur(0em)",
      transition: { duration, ease: EASE },
    },
  };

  const MotionTag = motion.create(as as string) as unknown as typeof motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(trigger === "view"
        ? { whileInView: "show", viewport: { once: true, margin: "-8% 0px" } }
        : { animate: "show" })}
      variants={container}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          variants={item}
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {unit === " " ? "\u00A0" : unit}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  ScrambleText — decode/cipher reveal for handles & code strings     */
/* ------------------------------------------------------------------ */

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

export function ScrambleText({
  text,
  className,
  speed = 34,
  delay = 200,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [output, setOutput] = useState<string>(reduce ? text : "\u00A0");

  useEffect(() => {
    if (reduce || !inView) {
      if (reduce) setOutput(text);
      return;
    }
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
  }, [text, speed, delay, reduce, inView]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
