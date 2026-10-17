/* Deployments and open-source work surfaced on /projects.
   These links also feed the JSON-LD sameAs graph so search engines can
   associate every property with the same person entity. */

export type ProjectEntry = {
  id: string;
  name: string;
  url: string;
  repo?: string;
  tag: string;
  status: string;
  description: string;
};

export const PROJECTS: ProjectEntry[] = [
  {
    id: "deep-space-cv",
    name: "Deep Space CV",
    url: "https://sajidafridi.com",
    repo: "https://github.com/Mrww305/worldwidedigital",
    tag: "PORTFOLIO · REACT · WEBGL",
    status: "LIVE",
    description:
      "This site: a real-time WebGL portfolio with prerendered routes, structured data for AI answer engines, and interactive proof-of-concept modules.",
  },
  {
    id: "digicard",
    name: "Digicard",
    url: "https://digicard-five.vercel.app",
    repo: "https://github.com/Mrww305/digicard",
    tag: "DIGITAL IDENTITY · REACT",
    status: "LIVE",
    description:
      "A compact digital CV and identity card — the fast-loading companion to the full Deep Space CV, built for sharing in one link.",
  },
  {
    id: "graviton",
    name: "GRAVITON/01",
    url: "https://rtx-five.vercel.app",
    repo: "https://github.com/Mrww305/rtx",
    tag: "PHYSICS · RAPIER WASM · WEBGL",
    status: "LIVE",
    description:
      "An interactive dark-matter physics field: 48 rigid bodies, Rapier WASM simulation and cursor force fields running in real time.",
  },
  {
    id: "liquid-light",
    name: "Liquid Light",
    url: "https://liquid305light.vercel.app",
    repo: "https://github.com/Mrww305/Liquid-light-",
    tag: "3D MATERIALS · TEXTILE TECH",
    status: "LIVE",
    description:
      "A tactile, spatial experiment in pearlescent materials and creative web engineering — real-time rendering applied to textile surfaces.",
  },
  {
    id: "hub-305",
    name: "305 — Sovereign Intelligence",
    url: "https://305.sajidafridi.com",
    tag: "PORTFOLIO HUB · PHYSICAL AUTOMATION",
    status: "LIVE",
    description:
      "A focused hub for sovereign intelligence and physical automation work: AI governance, SCADA and industrial AI engagements.",
  },
  {
    id: "mlops-enterprise-pipeline",
    name: "MLOps Enterprise Pipeline",
    url: "https://github.com/Mrww305/mlops-enterprise-pipeline",
    repo: "https://github.com/Mrww305/mlops-enterprise-pipeline",
    tag: "OPEN SOURCE · MLOPS",
    status: "OPEN SOURCE",
    description:
      "Reference implementation of a production ML pipeline: training, evaluation gates, drift detection and rollback doctrine.",
  },
  {
    id: "github",
    name: "GitHub — Mrww305",
    url: "https://github.com/Mrww305",
    tag: "CODE · OPEN SOURCE",
    status: "ACTIVE",
    description:
      "Source for every project above, plus AI agents, RAG experiments, MLOps tooling and infrastructure automation.",
  },
];
