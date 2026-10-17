import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import RouteIndex from "../components/RouteIndex";

export default function HomePage() {
  return (
    <>
      {/* Semantic summary for LLM crawlers and screen readers */}
      <div className="sr-only">
        <p>
          <strong>About Sajid Afridi (mrww305)</strong>
        </p>
        <p>
          Pakistani technology executive with 15+ years of cross-industrial experience and 6+
          years specialized in Data Science, Artificial Intelligence, and Physical AI. Holds a
          B.S. from Siena College, New York. Founder of MegniToo (AI/ML/DevOps incubator) and UMT
          AI Tech Incubator. Chief Technology Officer of Pakistan Red Team. Co-Founder of
          AIPakistani.com. AI Policy Consultant for National Information Technology Board (NITB)
          Pakistan.
        </p>
        <p>
          Core competencies include MLOps, Zero Trust Architecture, Retrieval-Augmented Generation
          (RAG), AI Agents (Langflow/n8n), SCADA systems, IoT, Edge Computing, Generative AI,
          Large Language Models, Computer Vision, Natural Language Processing, Federated Learning,
          Kubernetes, DevSecOps, Red Teaming, and National AI Policy formulation.
        </p>
        <p>
          Unique dual-expertise in Physical AI (SCADA, PLC programming, industrial automation,
          anti-drone systems) and Digital AI (LLMs, RAG, multi-agent systems, prompt engineering),
          enabling translation of industrial assets into sovereign AI governance frameworks aligned
          with CPEC opportunities.
        </p>
      </div>

      <Hero />
      <Marquee />
      <RouteIndex />
    </>
  );
}
