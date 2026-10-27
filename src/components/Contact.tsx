"use client";

import { useState, type FormEvent } from "react";
import SplitText from "./SplitText";
import { Reveal } from "./Section";
import { IDENTITY, LINKS } from "../data/cv";

type SendState = "idle" | "sending" | "sent" | "error";

const ERROR_COPY: Record<string, string> = {
  rate_limited: "RATE LIMIT REACHED — TRY AGAIN LATER OR EMAIL DIRECTLY",
  invalid_name: "CALLSIGN TOO SHORT",
  invalid_email: "RETURN ADDRESS LOOKS INVALID",
  invalid_message: "MESSAGE NEEDS AT LEAST 10 CHARACTERS",
  payload_too_large: "MESSAGE TOO LONG",
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SendState>("idle");
  const [errorCode, setErrorCode] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setErrorCode("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
          website: String(formData.get("website") ?? ""),
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || payload.ok !== true) {
        throw new Error(payload.error || "send_failed");
      }
      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorCode(error instanceof Error ? error.message : "send_failed");
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${IDENTITY.email}`;
    }
  };

  return (
    <section id="uplink" aria-labelledby="uplink-h" className="relative z-10 scroll-mt-24 px-5 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.34em] text-signal">
            <span className="led-live inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            [ 09 ] — CHANNEL OPEN · RESPONSE WINDOW &lt; 24H
          </p>
        </Reveal>

        <h2 id="uplink-h" className="font-display font-bold uppercase leading-[0.9] tracking-[-0.035em] text-ink">
          <SplitText
            text="ESTABLISH"
            as="span"
            className="block text-[clamp(2.6rem,9vw,7.5rem)]"
            stagger={0.05}
          />
          <SplitText
            text="UPLINK"
            as="span"
            delay={0.25}
            stagger={0.06}
            className="block text-[clamp(2.6rem,9vw,7.5rem)] text-transparent [-webkit-text-stroke:1.5px_rgba(232,232,232,0.55)]"
          />
        </h2>

        {/* giant email */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-5 border-y border-line py-7">
            <a
              href={`mailto:${IDENTITY.email}`}
              className="link-sweep font-display text-[clamp(1.3rem,4.2vw,3rem)] font-semibold tracking-tight text-ink transition-colors hover:text-signal"
            >
              {IDENTITY.email}
            </a>
            <button
              onClick={copyEmail}
              className="border border-line px-3 py-2 font-mono text-[10px] tracking-[0.22em] text-dim transition-all duration-300 hover:border-signal/70 hover:text-signal active:scale-95"
            >
              {copied ? "✓ COPIED TO BUFFER" : "COPY ADDRESS"}
            </button>
          </div>
        </Reveal>

        {/* transmission form — posts to the PHP endpoint on this server */}
        <Reveal delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="relative mt-12 grid gap-6 border border-line p-6 md:grid-cols-2 md:p-8"
            aria-labelledby="uplink-form-h"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line pb-4 md:col-span-2">
              <h3 id="uplink-form-h" className="font-mono text-[10px] tracking-[0.3em] text-faint">
                TRANSMIT MESSAGE
              </h3>
              <span className="font-mono text-[9px] tracking-[0.24em] text-faint">
                TLS · NO THIRD PARTIES
              </span>
            </div>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-[0.22em] text-faint">CALLSIGN</span>
              <input
                name="name"
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
                className="border border-line bg-transparent px-3 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-faint/60 focus:border-signal/70"
                placeholder="Your name"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] tracking-[0.22em] text-faint">RETURN ADDRESS</span>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className="border border-line bg-transparent px-3 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-faint/60 focus:border-signal/70"
                placeholder="you@company.com"
              />
            </label>

            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="font-mono text-[10px] tracking-[0.22em] text-faint">MESSAGE</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                className="resize-y border border-line bg-transparent px-3 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-faint/60 focus:border-signal/70"
                placeholder="Scope, timeline, or the problem you want solved."
              />
            </label>

            {/* Honeypot: off-screen, not focusable, never seen by humans. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="border border-signal/60 px-5 py-3 font-mono text-[10px] tracking-[0.24em] text-signal transition-all duration-300 hover:bg-signal hover:text-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending"
                  ? "TRANSMITTING…"
                  : status === "sent"
                    ? "RECEIVED ✓"
                    : "SEND TRANSMISSION"}
              </button>

              <p
                role="status"
                aria-live="polite"
                className="font-mono text-[10px] tracking-[0.2em] text-faint"
              >
                {status === "sent"
                  ? "MESSAGE RECEIVED — RESPONSE WITHIN 24H"
                  : status === "error"
                    ? ERROR_COPY[errorCode] ?? "TRANSMISSION FAILED — EMAIL DIRECTLY"
                    : "STORED ON THIS SERVER · NEVER SHARED"}
              </p>
            </div>
          </form>
        </Reveal>

        <div className="grid gap-14 py-14 lg:grid-cols-12">
          {/* direct channels */}
          <Reveal className="lg:col-span-4">
            <h3 className="mb-5 font-mono text-[10px] tracking-[0.3em] text-faint">DIRECT CHANNELS</h3>
            <ul className="space-y-4">
              <li className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-faint">PHONE</span>
                <a href={`tel:${IDENTITY.phoneHref}`} className="font-display text-base text-ink transition-colors hover:text-signal">
                  {IDENTITY.phone}
                </a>
              </li>
              <li className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-faint">DISCORD</span>
                <span className="font-display text-base text-ink">{IDENTITY.discord}</span>
              </li>
              <li className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] text-faint">BASE</span>
                <span className="text-right font-body text-[13px] font-light text-dim">{IDENTITY.location}</span>
              </li>
            </ul>
          </Reveal>

          {/* network ledger */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <h3 className="mb-5 font-mono text-[10px] tracking-[0.3em] text-faint">NETWORK NODES</h3>
            <ul className="border-t border-line">
              {LINKS.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-4 border-b border-line py-4 transition-all duration-400 hover:bg-ink/[0.03] hover:pl-3 md:gap-8"
                  >
                    <span className="font-mono text-[9px] tracking-[0.2em] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-semibold uppercase tracking-[0.03em] text-ink transition-colors group-hover:text-signal md:text-xl">
                      {l.label}
                    </span>
                    <span className="hidden flex-1 border-b border-dashed border-line/70 md:block" aria-hidden="true" />
                    <span className="font-mono text-[10.5px] tracking-[0.12em] text-dim">{l.handle}</span>
                    <span
                      className="font-display text-lg text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-signal"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
