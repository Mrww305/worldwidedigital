"use client";

import { useEffect, useRef, useState } from "react";
import MiniPocWindow from "../MiniPocWindow";

type Telemetry = { temp: number; pressure: number; speed: number; level: number; error: number };

const BASE: Telemetry = { temp: 78.2, pressure: 4.2, speed: 118, level: 64, error: 12.0 };

const TAGS = [
  { id: "PLC-01", name: "BATCH_MIX", hot: false },
  { id: "PLC-02", name: "CURE_OVEN", hot: true },
  { id: "VFD-03", name: "LINE_DRIVE", hot: false },
  { id: "SNS-07", name: "FLOW", hot: false },
  { id: "SNS-11", name: "VIBRATION", hot: false },
];

const walk = (cur: number, target: number, noise: number) =>
  cur + (target - cur) * 0.3 + (Math.random() - 0.5) * noise;

export default function ScadaPoc() {
  const [t, setT] = useState<Telemetry>(BASE);
  const [fault, setFault] = useState(false);
  const [auto, setAuto] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "SCADA link established — 5 nodes on Modbus/TCP",
    "batch line nominal · sampling @ 900 ms",
  ]);

  const faultRef = useRef(false);
  const autoRef = useRef(true);
  const faultTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    autoRef.current = auto;
  }, [auto]);

  useEffect(() => {
    const iv = setInterval(() => {
      setT((prev) => {
        const f = faultRef.current;
        const errTarget = autoRef.current ? 6.1 : 12.3;
        return {
          temp: walk(prev.temp, f ? 121 : 78, 1.4),
          pressure: walk(prev.pressure, f ? 6.8 : 4.2, 0.18),
          speed: walk(prev.speed, f ? 94 : 118, 2.4),
          level: walk(prev.level, 66, 5),
          error: Math.max(0.4, walk(prev.error, errTarget, 0.5)),
        };
      });
    }, 900);
    return () => {
      clearInterval(iv);
      if (faultTimer.current) clearTimeout(faultTimer.current);
    };
  }, []);

  const pushLog = (msg: string) => setLogs((prev) => [...prev.slice(-4), msg]);

  const injectFault = () => {
    if (faultRef.current) return;
    faultRef.current = true;
    setFault(true);
    pushLog("⚠ FAULT — BATCH-047 thermal excursion @ CURE_OVEN");
    if (autoRef.current) pushLog("PLC-02 auto-correction engaged — VFD ramp-down");
    faultTimer.current = setTimeout(() => {
      faultRef.current = false;
      setFault(false);
      pushLog(autoRef.current ? "line stabilized — excursion contained in 3.1 s ✓" : "line stabilized — manual intervention logged");
    }, 3400);
  };

  const gauges = [
    { k: "CURE TEMP", v: `${t.temp.toFixed(1)}°C`, pct: Math.min(t.temp / 130, 1), hot: t.temp > 100 },
    { k: "PRESSURE", v: `${t.pressure.toFixed(2)} bar`, pct: Math.min(t.pressure / 8, 1), hot: t.pressure > 5.6 },
    { k: "LINE SPEED", v: `${t.speed.toFixed(0)} m/min`, pct: Math.min(t.speed / 140, 1), hot: t.speed < 100 },
    { k: "HOPPER LVL", v: `${t.level.toFixed(0)}%`, pct: Math.min(t.level / 100, 1), hot: false },
  ];

  return (
    <MiniPocWindow
      title="scada-batch-line-hmi"
      subtitle="reshmatex · unit 02"
      status={fault ? "ALERT" : "LIVE"}
      className="h-full"
    >
      <div className="grid h-full gap-4 p-4 md:grid-cols-12">
        {/* gauges */}
        <div className="flex flex-col justify-center gap-3.5 md:col-span-4">
          {gauges.map((g) => (
            <div key={g.k}>
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-mono text-[9px] tracking-[0.22em] text-faint">{g.k}</span>
                <span className={`font-mono text-[11px] ${g.hot ? "text-alert" : "text-ink"}`}>{g.v}</span>
              </div>
              <div className="h-[3px] w-full bg-line/70">
                <div
                  className={`h-full transition-all duration-700 ${g.hot ? "bg-alert" : "bg-signal/80"}`}
                  style={{ width: `${Math.max(g.pct * 100, 3)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* error-rate core */}
        <div className="flex flex-col items-center justify-center border-y border-line py-4 md:col-span-4 md:border-x md:border-y-0 md:py-0">
          <p className="font-mono text-[9px] tracking-[0.28em] text-faint">DAILY HUMAN-ERROR RATE</p>
          <p
            className={`my-2 font-display text-6xl font-bold tracking-tight transition-colors duration-500 md:text-7xl ${
              t.error < 8 ? "text-signal" : "text-alert"
            }`}
          >
            {t.error.toFixed(1)}
            <span className="text-2xl">%</span>
          </p>
          <span
            className={`border px-2.5 py-1 font-mono text-[9px] tracking-[0.22em] ${
              auto ? "border-signal/60 text-signal" : "border-alert/60 text-alert"
            }`}
          >
            {auto ? "AUTO-DETECT ON · −50% VS BASELINE" : "AUTO-DETECT OFF · BASELINE 12%"}
          </span>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setAuto((a) => !a)}
              className="border border-line px-3 py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-dim transition-all duration-200 hover:border-signal/70 hover:text-signal active:scale-95"
            >
              {auto ? "DISABLE" : "ENABLE"} AI FAULT DETECTION
            </button>
            <button
              onClick={injectFault}
              disabled={fault}
              className="border border-alert/60 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-alert transition-all duration-200 hover:bg-alert/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
            >
              INJECT FAULT
            </button>
          </div>
        </div>

        {/* PLC tags + log */}
        <div className="flex flex-col justify-center gap-3 md:col-span-4">
          <ul className="space-y-1.5">
            {TAGS.map((tag) => {
              const alert = fault && tag.hot;
              return (
                <li key={tag.id} className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.14em]">
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      alert ? "bg-alert led-alert" : "bg-signal/80 led-live"
                    }`}
                  />
                  <span className={alert ? "text-alert" : "text-dim"}>{tag.id}</span>
                  <span className="text-faint">{tag.name}</span>
                  <span className={`ml-auto ${alert ? "text-alert" : "text-signal/70"}`}>
                    {alert ? "EXCURSION" : "NOMINAL"}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="border border-line/60 bg-black/70 px-3 py-2 font-mono text-[9.5px] leading-[1.75] text-dim" aria-live="polite">
            {logs.map((l, i) => (
              <p key={i} className={l.startsWith("⚠") ? "text-alert" : l.includes("✓") ? "text-signal/85" : ""}>
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </MiniPocWindow>
  );
}
