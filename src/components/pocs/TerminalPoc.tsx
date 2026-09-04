"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import MiniPocWindow from "../MiniPocWindow";

type LineKind = "in" | "out" | "sys" | "err";
type Line = { kind: LineKind; text: string };

const BOOT: { kind: LineKind; text: string; at: number }[] = [
  { kind: "sys", text: "ZTNA handshake .............. OK", at: 300 },
  { kind: "sys", text: "PAM token issued (ttl 3600s)  OK", at: 750 },
  { kind: "sys", text: "DAM audit stream ............ ENABLED", at: 1200 },
  { kind: "sys", text: "SDP perimeter ............... SEALED", at: 1650 },
  { kind: "out", text: "Welcome, operator. Type `help` to list commands.", at: 2200 },
];

const HELP = [
  "  help      — list available commands",
  "  whoami    — operator identity record",
  "  roles     — current command assignments",
  "  arsenal   — core competency index",
  "  missions  — abbreviated mission log",
  "  redteam   — offensive security briefing",
  "  scada     — physical AI field report",
  "  contact   — open uplink channels",
  "  trace     — route diagnostic",
  "  banner    — station ident",
  "  clear     — purge console buffer",
];

function respond(cmd: string): Line[] {
  switch (cmd) {
    case "help":
      return HELP.map((h) => ({ kind: "out", text: h }));
    case "whoami":
      return [
        { kind: "out", text: "SAJID AFRIDI — handle: mr305" },
        { kind: "out", text: "AI Governance Architect · MLOps & Zero Trust Architect" },
        { kind: "out", text: "Industrial Technologist · National AI Policy Strategist" },
        { kind: "out", text: "15+ yrs across Industry 1.0 → 4.0 · 6+ yrs deep in AI/DS" },
      ];
    case "roles":
      return [
        { kind: "out", text: "[01] Founder & CEO — MegniToo (2023— )" },
        { kind: "out", text: "[02] Founder & Director — UMT AI Tech Incubator (2022— )" },
        { kind: "out", text: "[03] CTO — Pakistan Red Team (2021— )" },
        { kind: "out", text: "[04] AI Policy Consultant — NITB Pakistan (2023— )" },
        { kind: "out", text: "[05] COO / MD-CTO — Reshmatex & Textile Group (2009— )" },
      ];
    case "arsenal":
      return [
        { kind: "out", text: "AI/DS: RAG · AI Agents (Langflow, n8n) · CV · NLP · GenAI · RL · Federated Learning" },
        { kind: "out", text: "MLOPS: Docker · Kubernetes (CKA) · CI/CD · DevSecOps · GPU/TPU/DPU orchestration" },
        { kind: "out", text: "PHYSICAL: SCADA · PLC (Ladder/FBD) · HMI · ESP32 · sensor fusion · anti-drone HW" },
        { kind: "out", text: "SECURITY: ZTNA · PAM · DAM · SDP · OSINT · red teaming · prompt-injection defense" },
        { kind: "out", text: "STACK: Python · Java · C++ · JS · R · MATLAB · TensorFlow · PyTorch · LangChain" },
      ];
    case "missions":
      return [
        { kind: "out", text: "2023—  MegniToo: zero-cost AI/ML/DevOps incubator, Lahore" },
        { kind: "out", text: "2022—  UMT AI Tech Incubator: Pakistan's first university AI incubator" },
        { kind: "out", text: "2021—  Pakistan Red Team: national offensive security & AI threat intel" },
        { kind: "out", text: "2023—  NITB: drafting Pakistan's National AI Policy 2025" },
        { kind: "out", text: "2009—  Reshmatex: SCADA rollout, batch error 12% → 6%" },
        { kind: "out", text: "prior  Asia Foam (PKR 300M/yr) · 8 yrs global trade, 5 markets" },
      ];
    case "redteam":
      return [
        { kind: "err", text: "// OFFENSIVE SECURITY BRIEFING — CLEARANCE: PUBLIC //" },
        { kind: "out", text: "AI abuse-case modeling: prompt injection · retrieval leakage · unsafe tool access" },
        { kind: "out", text: "Red team ops across fintech, government and healthcare." },
        { kind: "out", text: "Doctrine: systems are guilty until proven innocent." },
      ];
    case "scada":
      return [
        { kind: "out", text: "FIELD REPORT — Reshmatex batch lines" },
        { kind: "out", text: "SCADA + PLCs + VFDs + IIoT sensors deployed end-to-end" },
        { kind: "out", text: "Daily human error: 12% → 6% (50% reduction)" },
        { kind: "out", text: "OT/IT integrated · centralized KPI monitoring online" },
      ];
    case "contact":
      return [
        { kind: "out", text: "email    ceo@megnitoo.com" },
        { kind: "out", text: "phone    +92 311 9999978" },
        { kind: "out", text: "discord  thefabricman" },
        { kind: "out", text: "web      linkedin.com/in/mr305afridi · github.com/Mrww305 · kaggle.com/mrww305" },
      ];
    case "trace":
      return [
        { kind: "sys", text: "trace route to sovereignty.aipakistani.com" },
        { kind: "out", text: " 1  localhost ............... 0.2 ms" },
        { kind: "out", text: " 2  lahore-gw.pk ............ 4.1 ms" },
        { kind: "out", text: " 3  cpec-backbone ........... 11.8 ms" },
        { kind: "out", text: " 4  zt-policy-plane.nitb .... 19.4 ms" },
        { kind: "sys", text: "TRACE COMPLETE — sovereign route verified ✓" },
      ];
    case "banner":
      return [
        { kind: "out", text: "┌──────────────────────────────────────┐" },
        { kind: "out", text: "│  MR305 // DEEPFIELD STATION          │" },
        { kind: "out", text: "│  SAJID AFRIDI — DEEP SPACE CV v4.0   │" },
        { kind: "out", text: "│  LAHORE · KP · GLOBAL REMOTE         │" },
        { kind: "out", text: "└──────────────────────────────────────┘" },
      ];
    case "sudo":
    case "sudo rm -rf /":
      return [
        { kind: "err", text: "PAM: privilege escalation DENIED." },
        { kind: "err", text: "Zero trust isn't a slogan — it's a lifestyle." },
      ];
    case "clear":
      return [];
    default:
      return [{ kind: "err", text: `command not found: ${cmd} — try 'help'` }];
  }
}

const QUICK_CMDS = ["whoami", "roles", "redteam", "scada", "trace", "contact"];

export default function TerminalPoc() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timers = BOOT.map((b) =>
      setTimeout(() => setLines((prev) => [...prev, { kind: b.kind, text: b.text }]), b.at)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (raw?: string) => {
    const cmd = (raw ?? input).trim().toLowerCase();
    if (!cmd) return;
    setLines((prev) => {
      const next: Line[] = [...prev, { kind: "in", text: cmd }];
      if (cmd === "clear") return [];
      return [...next, ...respond(cmd)];
    });
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <MiniPocWindow
      title="zero-trust-shell"
      subtitle="mr305@deepfield"
      status="LIVE"
      className="h-full"
    >
      <div
        className="flex h-full cursor-text flex-col"
        onClick={() => inputRef.current?.focus()}
        role="button"
        tabIndex={-1}
        aria-label="Terminal focus area"
      >
        <div ref={scrollRef} className="h-[calc(100%-96px)] overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-[1.75]">
          {lines.map((l, i) => (
            <p
              key={i}
              className={
                l.kind === "in"
                  ? "text-ink"
                  : l.kind === "err"
                    ? "text-alert"
                    : l.kind === "sys"
                      ? "text-signal/80"
                      : "text-dim"
              }
            >
              {l.kind === "in" ? (
                <>
                  <span className="text-signal">mr305@zt</span>
                  <span className="text-faint">:~$</span> {l.text}
                </>
              ) : (
                <span className="whitespace-pre-wrap">{l.text}</span>
              )}
            </p>
          ))}
          <div className="flex items-center gap-1">
            <span className="text-signal">mr305@zt</span>
            <span className="text-faint">:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              size={Math.max(1, input.length + 1)}
              className="ml-1 max-w-[58%] bg-transparent font-mono text-[11.5px] text-ink caret-transparent outline-none"
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="cursor-blink text-signal" aria-hidden="true">
              ▍
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-2.5">
          {QUICK_CMDS.map((c) => (
            <button
              key={c}
              onClick={() => submit(c)}
              className="border border-line px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-dim transition-all duration-200 hover:border-signal/70 hover:text-signal active:scale-95"
            >
              ./{c}
            </button>
          ))}
        </div>
      </div>
    </MiniPocWindow>
  );
}
