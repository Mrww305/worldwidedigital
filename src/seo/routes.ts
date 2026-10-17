/* Route-level metadata: one source of truth used by
   - the client-side head manager (Seo.tsx)
   - the build-time prerenderer (scripts/prerender.mjs)
   - sitemap generation / navigation

   Every route has its own title, meta description and H1 so search engines
   get a distinct, name-bearing landing page instead of a single SPA shell. */

export type RouteMeta = {
  path: string;
  navLabel: string;
  navNumber: string;
  eyebrow: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  priority: string;
  changefreq: string;
};

export const SITE_ORIGIN = "https://sajidafridi.com";

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    navLabel: "HOME",
    navNumber: "00",
    eyebrow: "DEEP SPACE CV",
    title: "Sajid Afridi (mrww305) — AI Governance Architect",
    description:
      "Sajid Afridi (mrww305) — AI Governance Architect, MLOps & Zero Trust Architect. 15+ years across Industry 1.0–4.0. Founder MegniToo, CTO Pakistan Red Team, AI Policy Consultant NITB Pakistan.",
    h1: "Sajid Afridi — AI Governance Architect",
    intro:
      "Pakistani technology executive and engineer working at the intersection of AI governance, MLOps, Zero Trust security and Physical AI. Founder of MegniToo and the UMT AI Tech Incubator, CTO of Pakistan Red Team, and AI Policy Consultant to NITB Pakistan.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/about",
    navLabel: "PROFILE",
    navNumber: "01",
    eyebrow: "ENTITY RECORD",
    title: "About Sajid Afridi (mrww305) — AI Governance Architect",
    description:
      "Biography, executive summary and technical competencies of Sajid Afridi (mrww305): AI Governance Architect, MLOps and Zero Trust specialist, founder and national AI policy advisor in Pakistan.",
    h1: "About Sajid Afridi (mrww305)",
    intro:
      "Fifteen years across four industrial revolutions, six of them deep in data science and AI. This is the full entity record: executive summary, measurable outcomes, and the technical arsenal behind the work.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/experience",
    navLabel: "EXPERIENCE",
    navNumber: "02",
    eyebrow: "MISSION LOG",
    title: "Experience — Sajid Afridi (mrww305) | AI & MLOps Leadership",
    description:
      "Professional experience of Sajid Afridi (mrww305): founder and CTO roles across MegniToo, Pakistan Red Team, NITB Pakistan, UMT and Reshmatex — plus education and certifications.",
    h1: "Experience & Mission Log",
    intro:
      "Seven command assignments across manufacturing, cybersecurity, academia and national AI policy — from a textile group's SCADA floor to Pakistan's National AI Policy. Every mission shipped with the same doctrine: build systems that outlive their builders.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/projects",
    navLabel: "PROJECTS",
    navNumber: "03",
    eyebrow: "DEPLOYMENTS",
    title: "Projects — Sajid Afridi (mrww305) | AI, MLOps & Physical AI",
    description:
      "Live projects and deployments by Sajid Afridi (mrww305): digital CV platforms, interactive 3D experiments, MLOps pipelines, SCADA proof-of-concepts and open-source AI infrastructure.",
    h1: "Projects & Deployments",
    intro:
      "Working systems, not slide decks. Each entry below is live and inspectable — digital CVs, interactive WebGL experiments, MLOps tooling and industrial AI proof-of-concepts.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/lab",
    navLabel: "LIVE LAB",
    navNumber: "04",
    eyebrow: "PROOF OF CONCEPT",
    title: "Live Lab — Sajid Afridi (mrww305) | AI, MLOps & SCADA Demos",
    description:
      "Interactive proof-of-concept demos by Sajid Afridi (mrww305): a Zero Trust shell, an MLOps drift and rollback pipeline, and a SCADA batch-line HMI running directly in the browser.",
    h1: "Live Lab",
    intro:
      "Three working proof-of-concept windows running directly inside this CV — no navigation, no sandbox escapes. Interrogate the Zero Trust shell, trip the ML pipeline's eval gate, or inject a thermal fault on the batch line.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    navLabel: "UPLINK",
    navNumber: "05",
    eyebrow: "OPEN CHANNEL",
    title: "Contact Sajid Afridi (mrww305) — AI Governance Architect",
    description:
      "Contact Sajid Afridi (mrww305) for AI governance, MLOps, Zero Trust architecture, Physical AI and national AI policy work. Email, phone, LinkedIn, GitHub and Kaggle.",
    h1: "Contact Sajid Afridi",
    intro:
      "Open to executive and lead engineering roles, technical consultation on secure multimodal AI and Zero Trust architecture, and academic or policy engagements. Direct channels below — no gatekeepers.",
    priority: "0.7",
    changefreq: "yearly",
  },
];

export const NAV_ROUTES = ROUTES.filter((route) => route.path !== "/");

export function routeHref(route: RouteMeta): string {
  return route.path === "/" ? "/" : `${route.path}/`;
}

export function routeMeta(path: string): RouteMeta {
  const clean = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return ROUTES.find((route) => route.path === clean) ?? ROUTES[0];
}
