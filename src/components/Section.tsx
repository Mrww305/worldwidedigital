"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Line-mask reveal used for every section heading. */
export function SectionHeading({
  index,
  title,
  note,
  id,
}: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-3 flex items-center gap-4 font-mono text-[10px] tracking-[0.34em] text-signal"
      >
        <span>[ {index} ]</span>
        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          className="h-px w-16 origin-left bg-line"
        />
        {note ? <span className="text-faint">{note}</span> : null}
      </motion.div>
      <h2 id={id} className="overflow-hidden">
        <motion.span
          initial={reduce ? false : { y: "112%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="block font-display text-[clamp(2.2rem,6vw,4.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-ink"
        >
          {title}
        </motion.span>
      </h2>
    </div>
  );
}

/* Generic scroll-reveal wrapper. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
