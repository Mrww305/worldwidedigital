"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import DynamicVHProvider from "./components/DynamicVHProvider";
import Nav from "./components/Nav";
import SiteFooter from "./components/SiteFooter";
import Seo from "./seo/Seo";
import { RouterProvider, useRouter } from "./router";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import LabPage from "./pages/LabPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

/* three.js lives in its own lazy chunk — parsed after first paint. */
const WebGLBackground = lazy(() => import("./components/WebGLBackground"));

function RouteView() {
  const { path } = useRouter();

  switch (path) {
    case "/":
      return <HomePage />;
    case "/about":
      return <AboutPage />;
    case "/experience":
      return <ExperiencePage />;
    case "/projects":
      return <ProjectsPage />;
    case "/lab":
      return <LabPage />;
    case "/contact":
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App({
  initialPath = "/",
  prerender = false,
}: {
  initialPath?: string;
  prerender?: boolean;
}) {
  // Load the decorative three.js background (~824 kB) only after the visitor
  // interacts (scroll / pointer / key / touch), with a delayed fallback for
  // idle viewers. Never during prerender — the crawler must not pay for it.
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    if (prerender || showBackground) return;

    // Skip the scene entirely — not just defer it — when it would be wasted
    // or hostile: reduced-motion users, metered/2G connections, and phones.
    // The static vignette layer already provides the visual depth there.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const metered =
      connection?.saveData === true || /(^|-)2g$/.test(connection?.effectiveType ?? "");
    if (reduceMotion || smallScreen || metered) return;

    const enable = () => setShowBackground(true);
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "scroll",
      "wheel",
      "touchstart",
      "keydown",
    ];
    events.forEach((e) => window.addEventListener(e, enable, { passive: true, once: true }));
    const fallback = window.setTimeout(enable, 7000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, enable));
      window.clearTimeout(fallback);
    };
  }, [showBackground, prerender]);

  return (
    <MotionConfig reducedMotion={prerender ? "always" : "user"}>
      <RouterProvider initialPath={initialPath}>
        <Seo />
        <DynamicVHProvider>
          <div className="relative min-h-screen bg-void font-body text-ink">
            {/* z-0 : interactive WebGL deep-space field (deferred to idle) */}
            {!prerender && showBackground && (
              <Suspense fallback={null}>
                <WebGLBackground />
              </Suspense>
            )}

            {/* z-1 : cinematic vignette above canvas, below content */}
            <div className="vignette-overlay" aria-hidden="true" />

            {/* z-50 : navigation + scroll progress */}
            <Nav />

            {/* z-10 : typography / content layer */}
            <main className="relative z-10">
              <RouteView />
            </main>

            <SiteFooter />

            {/* z-70 : film grain */}
            <div className="noise-overlay" aria-hidden="true" />
          </div>
        </DynamicVHProvider>
      </RouterProvider>
    </MotionConfig>
  );
}
