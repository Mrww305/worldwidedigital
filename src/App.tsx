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
            {/* Semantic summary for LLM crawlers and accessibility */}
            <div className="sr-only" aria-hidden="false">
              <h2>About Sajid Afridi (Mrww305)</h2>
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
