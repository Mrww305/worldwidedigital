"use client";

import type { ReactNode } from "react";
import { useDynamicVH } from "../hooks/useDynamicVH";

/**
 * DynamicVHProvider
 * Renders nothing — it simply keeps the `--vh` custom property in sync with
 * the real visible viewport so hero sections sized with
 * `height: calc(var(--vh, 1vh) * 100)` never overflow on mobile.
 */
export default function DynamicVHProvider({ children }: { children?: ReactNode }) {
  useDynamicVH();
  return <>{children ?? null}</>;
}
