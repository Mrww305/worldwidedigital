"use client";

import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import DynamicVHProvider from "./components/DynamicVHProvider";

/* three.js lives in its own lazy chunk — parsed after first paint. */
const WebGLBackground = lazy(() => import("./components/WebGLBackground"));
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Profile from "./components/Profile";
import Competencies from "./components/Competencies";
import Experience from "./components/Experience";
import PoCLab from "./components/PoCLab";
import Ecosystem from "./components/Ecosystem";
import Contact from "./components/Contact";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DynamicVHProvider>
        <div className="relative min-h-screen bg-void font-body text-ink">
          {/* z-0 : interactive WebGL deep-space field */}
          <Suspense fallback={null}>
            <WebGLBackground />
          </Suspense>

          {/* z-1 : cinematic vignette above canvas, below content */}
          <div className="vignette-overlay" aria-hidden="true" />

          {/* z-50 : navigation + scroll progress */}
          <Nav />

          {/* z-10 : typography / content layer */}
          <main className="relative z-10">
            <Hero />
            <Marquee />
            <Profile />
            <Competencies />
            <Experience />
            <PoCLab />
            <Ecosystem />
            <Contact />
          </main>

          {/* z-70 : film grain */}
          <div className="noise-overlay" aria-hidden="true" />
        </div>
      </DynamicVHProvider>
    </MotionConfig>
  );
}
