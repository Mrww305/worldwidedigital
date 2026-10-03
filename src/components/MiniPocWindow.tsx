"use client";

import type { ReactNode } from "react";

export type PocStatus = "LIVE" | "IDLE" | "ALERT";

export default function MiniPocWindow({
  title,
  subtitle,
  status = "LIVE",
  className = "",
  children,
}: {
  title: string;
  subtitle?: string;
  status?: PocStatus;
  className?: string;
  children: ReactNode;
}) {
  const tone =
    status === "LIVE" ? "bg-signal led-live" : status === "ALERT" ? "bg-alert led-alert" : "bg-faint";

  return (
    <div className={`brackets flex flex-col border border-line bg-[#050505]/92 ${className}`}>
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-line px-4">
        <span className="h-2 w-2 rounded-full border border-line" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full border border-line" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full border border-line" aria-hidden="true" />
        <span className="ml-3 truncate font-mono text-[10.5px] tracking-[0.22em] text-dim">
          {title}
        </span>
        {subtitle ? (
          <span className="hidden truncate font-mono text-[9px] tracking-[0.2em] text-faint sm:inline">
            — {subtitle}
          </span>
        ) : null}
        <span className="ml-auto flex items-center gap-2 font-mono text-[9px] tracking-[0.24em] text-dim">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${tone}`} />
          {status}
        </span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
