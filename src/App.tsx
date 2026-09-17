"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import DynamicVHProvider from "./components/DynamicVHProvider";

/* Lazy-load heavy components for better TBT and Speed Index */
const WebGLBackground = lazy(() => import("./components/WebGLBackground"));
const PoCLab = lazy(() => import("./components/PoCLab"));
const Ecosystem = lazy(() => import("./components/Ecosystem"));
const Contact = lazy(() => import("./components/Contact"));

/* Critical components loaded synchronously for LCP */
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Profile from "./components/Profile";
import Competencies from "./components/Competencies";
import Experience from "./components/Experience";

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <DynamicVHProvider>
        <div className="relative min-h-screen bg-void font-body text-ink">
          {/* z-0 : interactive WebGL deep-space field - deferred until after hydration */}
          {isClient && (
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
            {/* Semantic summary for LLM crawlers and accessibility */}
            <div className="sr-only" aria-hidden="false">
              <h2>About Sajid Afridi (mrww305)</h2>
              <p>
                Pakistani technology executive with 15+ years of cross-industrial experience and 6+ years specialized in Data Science, Artificial Intelligence, and Physical AI. Holds a B.S. from Siena College, New York. Founder of MegniToo (AI/ML/DevOps incubator) and UMT AI Tech Incubator. Chief Technology Officer of Pakistan Red Team. Co-Founder of AIPakistani.com. AI Policy Consultant for National Information Technology Board (NITB) Pakistan.
              </p>
              <p>
                Core competencies include MLOps, Zero Trust Architecture, Retrieval-Augmented Generation (RAG), AI Agents (Langflow/n8n), SCADA systems, IoT, Edge Computing, Generative AI, Large Language Models, Computer Vision, Natural Language Processing, Federated Learning, Kubernetes, DevSecOps, Red Teaming, and National AI Policy formulation.
              </p>
              <p>
                Unique dual-expertise in Physical AI (SCADA, PLC programming, industrial automation, anti-drone systems) and Digital AI (LLMs, RAG, multi-agent systems, prompt engineering), enabling translation of industrial assets into sovereign AI governance frameworks aligned with CPEC opportunities.
              </p>
            </div>
            
            {/* Critical above-the-fold content */}
            <Hero />
            <Marquee />
            <Profile />
            <Competencies />
            <Experience />
            
            {/* Below-the-fold content - lazy loaded */}
            <Suspense fallback={<div className="h-96" />}>
              <PoCLab />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <Ecosystem />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
              <Contact />
            </Suspense>
          </main>

          {/* z-70 : film grain */}
          <div className="noise-overlay" aria-hidden="true" />
        </div>
      </DynamicVHProvider>
    </MotionConfig>
  );
}
