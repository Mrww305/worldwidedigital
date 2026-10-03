"use client";

import { useEffect, useRef, useState } from "react";
import MiniPocWindow from "../MiniPocWindow";

const STAGES = ["INGEST", "FEATURE", "TRAIN", "EVAL", "DEPLOY"] as const;
type StageId = (typeof STAGES)[number];
type StageStatus = "idle" | "active" | "done" | "fail";

const STAGE_META: Record<StageId, string> = {
  INGEST: "4.2k rows",
  FEATURE: "128 dims",
  TRAIN: "12 epochs",
  EVAL: "gate: F1≥0.91",
  DEPLOY: "k8s rollout",
};

const INITIAL: Record<StageId, StageStatus> = {
  INGEST: "idle",
  FEATURE: "idle",
  TRAIN: "idle",
  EVAL: "idle",
  DEPLOY: "idle",
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function PipelinePoc() {
  const [statuses, setStatuses] = useState<Record<StageId, StageStatus>>(INITIAL);
  const [phase, setPhase] = useState<"IDLE" | "RUNNING" | "ROLLBACK" | "DEPLOYED">("IDLE");
  const [driftArmed, setDriftArmed] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "> manifest loaded — mlops-enterprise-pipeline v2.3",
    "> registry: model artifacts signed ✓ · SBOM verified ✓",
    "> awaiting operator command…",
  ]);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(2.42);
  const [acc, setAcc] = useState(31.8);
  const [gpu, setGpu] = useState(0);
  const [spark, setSpark] = useState<number[]>([]);

  const runId = useRef(0);
  const driftRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      runId.current = -1;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  const log = (msg: string) =>
    setLogs((prev) => [...prev.slice(-9), msg]);

  const setStage = (s: StageId, v: StageStatus) =>
    setStatuses((prev) => ({ ...prev, [s]: v }));

  const startMetrics = () => {
    let e = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      e += 1;
      const l = Math.max(0.06, 2.42 * Math.exp(-e / 9) + (Math.random() - 0.5) * 0.05);
      setEpoch(e);
      setLoss(l);
      setAcc(Math.min(99.1, 100 - l * 28 - Math.random() * 1.2));
      setGpu(Math.round(76 + Math.random() * 21));
      setSpark((prev) => [...prev.slice(-47), l]);
    }, 200);
  };

  const stopMetrics = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGpu(4);
  };

  const run = async () => {
    if (phase === "RUNNING" || phase === "ROLLBACK") return;
    const id = ++runId.current;
    const alive = () => runId.current === id;

    setPhase("RUNNING");
    setStatuses(INITIAL);
    setSpark([]);
    setEpoch(0);
    log("> RUN initiated — CI/CD gate passed, image sha256:9f3c… verified");
    startMetrics();

    const dwell: Record<StageId, number> = {
      INGEST: 1000,
      FEATURE: 1100,
      TRAIN: 2100,
      EVAL: 1300,
      DEPLOY: 1200,
    };

    for (const stage of STAGES) {
      if (!alive()) return;
      setStage(stage, "active");
      log(`> ${stage} :: ${STAGE_META[stage]} — running`);
      await sleep(dwell[stage]);
      if (!alive()) return;

      if (stage === "EVAL" && driftRef.current) {
        setStage(stage, "fail");
        driftRef.current = false;
        setDriftArmed(false);
        setPhase("ROLLBACK");
        log("! EVAL FAILED — data drift detected (PSI 0.41 > 0.20)");
        log("! rollback initiated → previous champion model restored");
        await sleep(1600);
        if (!alive()) return;
        log("> retraining on fresh window… drift purged");
        setStage("TRAIN", "active");
        await sleep(1800);
        if (!alive()) return;
        setStage("TRAIN", "done");
        setStage("EVAL", "active");
        await sleep(1100);
        if (!alive()) return;
        setPhase("RUNNING");
      }
      setStage(stage, "done");

      if (stage === "EVAL") log("> EVAL PASSED — F1 0.943 · recall 0.931 · drift PSI 0.07");
      if (stage === "DEPLOY") {
        log("> DEPLOY complete — canary 5% → 100% · observability hooks live");
        setPhase("DEPLOYED");
      }
    }

    if (!alive()) return;
    stopMetrics();
  };

  const injectDrift = () => {
    if (driftRef.current) return;
    driftRef.current = true;
    setDriftArmed(true);
    log("> drift payload queued — will trip the next EVAL gate");
    if (phase === "IDLE" || phase === "DEPLOYED") log("> hint: press RUN PIPELINE to watch rollback doctrine");
  };

  const sparkPoints = spark
    .map((v, i) => `${(i / Math.max(spark.length - 1, 1)) * 200},${46 - Math.min(v, 2.6) * 16}`)
    .join(" ");

  const statusColor = (s: StageStatus) =>
    s === "active"
      ? "border-signal/70 text-signal"
      : s === "done"
        ? "border-line text-ink"
        : s === "fail"
          ? "border-alert/70 text-alert"
          : "border-line/60 text-faint";

  return (
    <MiniPocWindow
      title="mlops-pipeline-monitor"
      subtitle="mlops-enterprise-pipeline v2.3"
      status={phase === "ROLLBACK" ? "ALERT" : "LIVE"}
      className="h-full"
    >
      <div className="flex h-full flex-col gap-3 p-4">
        {/* stage flow */}
        <div className="flex items-stretch gap-1.5 md:gap-2">
          {STAGES.map((stage, i) => (
            <div key={stage} className="flex flex-1 items-center gap-1.5 md:gap-2">
              <div
                className={`flex-1 border bg-black/60 px-1.5 py-2 text-center transition-colors duration-300 md:px-2 ${statusColor(
                  statuses[stage]
                )}`}
              >
                <p className="font-mono text-[9px] tracking-[0.18em] md:text-[10px]">{stage}</p>
                <p className="mt-0.5 hidden font-mono text-[8px] text-faint md:block">
                  {STAGE_META[stage]}
                </p>
              </div>
              {i < STAGES.length - 1 && (
                <svg width="18" height="10" viewBox="0 0 18 10" className="hidden shrink-0 sm:block" aria-hidden="true">
                  <line
                    x1="0"
                    y1="5"
                    x2="14"
                    y2="5"
                    stroke={statuses[STAGES[i + 1]] !== "idle" ? "#8fd0e0" : "#3a3a3a"}
                    strokeWidth="1"
                    className={statuses[STAGES[i + 1]] === "active" ? "dash-flow" : ""}
                  />
                  <path d="M14 1 L18 5 L14 9" fill="none" stroke={statuses[STAGES[i + 1]] !== "idle" ? "#8fd0e0" : "#3a3a3a"} strokeWidth="1" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* metrics + sparkline */}
        <div className="grid grid-cols-4 gap-px border border-line bg-line">
          {[
            { k: "EPOCH", v: String(epoch) },
            { k: "LOSS", v: loss.toFixed(3) },
            { k: "ACC", v: `${acc.toFixed(1)}%` },
            { k: "GPU", v: `${gpu}%` },
          ].map((m) => (
            <div key={m.k} className="bg-black px-2.5 py-2">
              <p className="font-mono text-[8px] tracking-[0.24em] text-faint">{m.k}</p>
              <p className="font-display text-sm font-semibold text-ink md:text-base">{m.v}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] tracking-[0.24em] text-faint">LOSS CURVE</span>
          <svg viewBox="0 0 200 48" preserveAspectRatio="none" className="h-10 flex-1" aria-hidden="true">
            <line x1="0" y1="46" x2="200" y2="46" stroke="#1e1e1e" strokeWidth="1" />
            {spark.length > 1 && (
              <polyline points={sparkPoints} fill="none" stroke="#8fd0e0" strokeWidth="1.4" />
            )}
          </svg>
          <span
            className={`border px-2 py-1 font-mono text-[9px] tracking-[0.2em] ${
              phase === "DEPLOYED"
                ? "border-signal/60 text-signal"
                : phase === "ROLLBACK"
                  ? "border-alert/60 text-alert"
                  : "border-line text-dim"
            }`}
          >
            {phase}
          </span>
        </div>

        {/* controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={run}
            disabled={phase === "RUNNING" || phase === "ROLLBACK"}
            className="border border-signal/60 bg-signal/10 px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] text-signal transition-all duration-200 hover:bg-signal/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
          >
            ▶ RUN PIPELINE
          </button>
          <button
            onClick={injectDrift}
            disabled={driftArmed}
            className="border border-alert/60 px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] text-alert transition-all duration-200 hover:bg-alert/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
          >
            ⚠ INJECT DRIFT
          </button>
          {driftArmed && (
            <span className="self-center font-mono text-[9px] tracking-[0.18em] text-alert/80">
              DRIFT ARMED — NEXT EVAL WILL FAIL
            </span>
          )}
        </div>

        {/* log feed */}
        <div
          ref={logRef}
          className="min-h-0 flex-1 overflow-y-auto border border-line/60 bg-black/70 px-3 py-2 font-mono text-[10px] leading-[1.8] text-dim"
          aria-live="polite"
          aria-label="Pipeline event log"
        >
          {logs.map((l, i) => (
            <p key={i} className={l.startsWith("!") ? "text-alert" : l.includes("✓") || l.includes("PASSED") || l.includes("complete") ? "text-signal/85" : ""}>
              {l}
            </p>
          ))}
        </div>
      </div>
    </MiniPocWindow>
  );
}
