"use client";

import { lazy, Suspense } from "react";
import { SectionHeading, Reveal } from "./Section";
import MiniPocWindow from "./MiniPocWindow";

/* Lazy-loaded, self-contained PoC modules (Vite code-splits each one). */
const TerminalPoc = lazy(() => import("./pocs/TerminalPoc"));
const PipelinePoc = lazy(() => import("./pocs/PipelinePoc"));
const ScadaPoc = lazy(() => import("./pocs/ScadaPoc"));

function PocFallback({ title }: { title: string }) {
  return (
    <MiniPocWindow title={title} status="IDLE" className="h-full">
      <div className="flex h-full items-center justify-center">
        <p className="animate-pulse font-mono text-[10px] tracking-[0.3em] text-faint">
          LOADING MODULE…
        </p>
      </div>
    </MiniPocWindow>
  );
}

export default function PoCLab() {
  return (
    <section id="lab" aria-labelledby="lab-h" className="relative z-10 scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="Live Lab"
          note="MINI POC WINDOWS — TESTABLE, EMBEDDED, SELF-CONTAINED"
          id="lab-h"
        />

        <Reveal>
          <p className="-mt-6 mb-12 max-w-2xl font-body text-sm font-light leading-[1.85] text-dim md:mb-14">
            Three working proof-of-concept windows running directly inside this CV — no navigation,
            no sandbox escapes. Each module carries its own state: interrogate the shell, trip the
            ML pipeline's eval gate, or inject a thermal fault on the batch line.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="h-[460px] lg:col-span-5" y={30}>
            <Suspense fallback={<PocFallback title="zero-trust-shell" />}>
              <TerminalPoc />
            </Suspense>
          </Reveal>

          <Reveal className="h-[460px] lg:col-span-7" delay={0.1} y={30}>
            <Suspense fallback={<PocFallback title="mlops-pipeline-monitor" />}>
              <PipelinePoc />
            </Suspense>
          </Reveal>

          <Reveal className="h-[440px] lg:col-span-12" delay={0.05} y={30}>
            <Suspense fallback={<PocFallback title="scada-batch-line-hmi" />}>
              <ScadaPoc />
            </Suspense>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[10px] tracking-[0.24em] text-faint">
            <span><span className="text-signal">POC-01</span> // ZTNA CONSOLE INTERROGATION</span>
            <span><span className="text-signal">POC-02</span> // MLOPS DRIFT → ROLLBACK DOCTRINE</span>
            <span><span className="text-signal">POC-03</span> // PHYSICAL AI · OT/IT TELEMETRY</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
