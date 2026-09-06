/* ------------------------------------------------------------------ */
/*  Single source of truth for every datum on the Deep Space CV        */
/* ------------------------------------------------------------------ */

export type LinkEntry = {
  id: string;
  label: string;
  handle: string;
  url: string;
};

export type Role = {
  id: string;
  title: string;
  org: string;
  orgUrl?: string;
  where: string;
  period: string;
  tag: string;
  bullets: string[];
};

export type CompetencyDomain = {
  id: string;
  index: string;
  title: string;
  note: string;
  skills: string[];
};

export type Stat = { value: string; label: string };

export const IDENTITY = {
  name: "Sajid Afridi",
  handle: "mr305",
  email: "ceo@megnitoo.com",
  phone: "+92 311 9999978",
  phoneHref: "+923119999978",
  discord: "thefabricman",
  location: "Lahore / Khyber Pakhtunkhwa, Pakistan",
  coords: "31.5204° N — 74.3587° E",
  roles: [
    { n: "01", label: "AI Governance Architect" },
    { n: "02", label: "MLOps & Zero Trust Architect" },
    { n: "03", label: "Industrial Technologist — Physical AI" },
    { n: "04", label: "National AI Policy Strategist" },
    { n: "05", label: "Founder, MegniToo", serif: true },
  ] as { n: string; label: string; serif?: boolean }[],
};

export const LINKS: LinkEntry[] = [
  { id: "li", label: "LinkedIn", handle: "linkedin.com/in/mr305afridi", url: "https://www.linkedin.com/in/mr305afridi" },
  { id: "gh", label: "GitHub", handle: "github.com/Mrww305", url: "https://github.com/Mrww305" },
  { id: "kg", label: "Kaggle", handle: "kaggle.com/mrww305", url: "https://www.kaggle.com/mrww305" },
  { id: "mt", label: "MegniToo", handle: "megnitoo.com", url: "https://megnitoo.com" },
  { id: "prt", label: "Pakistan Red Team", handle: "pakistanredteam.com", url: "https://pakistanredteam.com" },
  { id: "aip", label: "AIPakistani", handle: "aipakistani.com", url: "https://aipakistani.com" },
  { id: "aim", label: "AIMarhaba", handle: "aimarhaba.com", url: "https://aimarhaba.com" },
];

export const MARQUEE_KEYWORDS = [
  "MLOPS",
  "ZERO TRUST",
  "PHYSICAL AI",
  "RAG",
  "SCADA",
  "KUBERNETES · CKA",
  "AI AGENTS",
  "FEDERATED LEARNING",
  "GENERATIVE AI",
  "RED TEAMING",
  "EDGE COMPUTING",
  "DEVSECOPS",
  "NITB PAKISTAN",
  "MEGNITOO",
  "OT/IT INTEGRATION",
  "SOVEREIGN AI",
];

export const PARSER_NOTE =
  "Entity: Sajid Afridi (handle: mr305). Pakistani technology executive — 15+ years cross-industrial experience, 6+ years specialized in Data Science, Artificial Intelligence and Physical AI. B.S., Siena College NY. Founder of MegniToo and UMT AI Tech Incubator. CTO of Pakistan Red Team. Co-founder of AIPakistani.com. AI Policy Consultant for NITB Pakistan. Core competencies: MLOps, Zero Trust Architecture, RAG, AI Agents (Langflow/n8n), SCADA, Generative AI.";

export const EXECUTIVE_SUMMARY: string[] = [
  "Visionary technology executive and engineer with 15+ years of experience spanning the 1st through 4th Industrial Revolutions, including 6+ years of deep specialization in Data Science, Artificial Intelligence and Physical AI — bridging advanced algorithmic development (Computer Vision, NLP, Generative AI, AI Agents) with zero-trust security paradigms and enterprise-grade MLOps.",
  "A rare dual command of Physical AI — SCADA, IoT, edge computing, anti-drone systems — and Digital AI — LLMs, RAG, federated learning — translating industrial assets into sovereign AI governance frameworks. Trusted advisor to government (NITB Pakistan), academia (UMT, The City School) and industry, driving Pakistan's digital transformation and CPEC-aligned technological sovereignty.",
];

export const STATS: Stat[] = [
  { value: "15+", label: "Years across Industry 1.0 → 4.0" },
  { value: "6+", label: "Years deep in AI & Data Science" },
  { value: "300M", label: "PKR annual revenue — Asia Foam" },
  { value: "50%", label: "Batch error reduction — 12% → 6%" },
  { value: "8", label: "Years international trade · 5 markets" },
  { value: "3", label: "National platforms founded / co-founded" },
];

export const COMPETENCIES: CompetencyDomain[] = [
  {
    id: "ai-ds",
    index: "01",
    title: "Artificial Intelligence & Data Science",
    note: "End-to-end intelligence — from raw signal to deployed cognition.",
    skills: [
      "End-to-End ML Pipelines",
      "Retrieval-Augmented Generation (RAG)",
      "AI Agents — Langflow · n8n",
      "Natural Language Processing",
      "3D Computer Vision",
      "OCR · TTS",
      "Generative AI — Text-to-Image / Video",
      "Reinforcement Learning",
      "Federated Learning",
      "Homomorphic Encryption",
    ],
  },
  {
    id: "mlops",
    index: "02",
    title: "MLOps & Cloud Infrastructure",
    note: "Production-grade rails for models that never sleep.",
    skills: [
      "Docker",
      "Kubernetes (CKA)",
      "CI/CD Pipelines",
      "DevSecOps",
      "Edge / Fog / Serverless",
      "Microservices Architecture",
      "GPU / TPU / DPU Orchestration",
    ],
  },
  {
    id: "physical",
    index: "03",
    title: "Physical AI & Industrial Automation",
    note: "Industry 3.0/4.0 — where silicon meets the factory floor.",
    skills: [
      "SCADA Architecture",
      "PLC Programming — Ladder / FBD",
      "HMI Design",
      "OT/IT Integration",
      "Arduino · ESP8266 · ESP32",
      "Raspberry Pi",
      "Sensor Fusion",
      "Anti-Drone Hardware",
      "3D Printing · Rapid Prototyping",
    ],
  },
  {
    id: "zerotrust",
    index: "04",
    title: "Cybersecurity & Zero Trust",
    note: "Never trust, always verify — humans and models alike.",
    skills: [
      "Zero Trust Network Access (ZTNA)",
      "Privileged Access Management (PAM)",
      "Database Activity Monitoring (DAM)",
      "Software-Defined Perimeter (SDP)",
      "OSINT",
      "Red Teaming",
      "Penetration Testing",
      "Prompt Injection Defense",
      "Retrieval Leakage Prevention",
    ],
  },
  {
    id: "stack",
    index: "05",
    title: "Programming & Frameworks",
    note: "The working vocabulary of fifteen years of shipping.",
    skills: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "R",
      "MATLAB",
      "SQL · NoSQL",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "LangChain",
    ],
  },
];

export const ROLES: Role[] = [
  {
    id: "megnitoo",
    title: "Founder & Chief Executive Officer",
    org: "MegniToo",
    orgUrl: "https://megnitoo.com",
    where: "Lahore, Pakistan",
    period: "2023 — Present",
    tag: "AI · ML · DEVOPS INCUBATOR",
    bullets: [
      "Pioneering Pakistan's premier zero-cost AI, Machine Learning and DevOps incubator for underprivileged youth.",
      "Architected an industry-aligned curriculum covering Generative AI, LLM Prompt Engineering, Multi-Agent Systems and Workflow Automation.",
      "Deployed scalable cloud infrastructure and persistent digital workspaces so students ship production-ready ML pipelines and public GitHub portfolios.",
      "Established industry mentorship pipelines connecting graduates directly with MLOps and AI infrastructure roles.",
    ],
  },
  {
    id: "umt",
    title: "Founder & Director",
    org: "UMT AI Tech Incubator",
    where: "University of Management and Technology, Lahore",
    period: "2022 — Present",
    tag: "ACADEMIA × INDUSTRY",
    bullets: [
      "Established Pakistan's first university-integrated AI tech incubator — hands-on mentorship in neural networks, prompt engineering and AI agent development.",
      "Spearheaded the “AI Business Transformation” webinar and workshop series, bridging academic research and commercial AI deployment.",
    ],
  },
  {
    id: "prt",
    title: "Chief Technology Officer (CTO)",
    org: "Pakistan Red Team",
    orgUrl: "https://pakistanredteam.com",
    where: "Pakistan",
    period: "2021 — Present",
    tag: "OFFENSIVE SECURITY · AI THREAT INTEL",
    bullets: [
      "Lead national cybersecurity and SecOps initiatives specializing in AI-powered threat intelligence and offensive security.",
      "Designed AI abuse-case modeling frameworks testing enterprise LLMs against prompt injection, retrieval leakage and unsafe tool access.",
      "Directed red team operations, penetration testing and cloud security assessments across fintech, government and healthcare.",
    ],
  },
  {
    id: "nitb",
    title: "AI Policy Consultant",
    org: "National Information Technology Board (NITB), Pakistan",
    where: "Islamabad, Pakistan",
    period: "2023 — Present",
    tag: "SOVEREIGN AI GOVERNANCE",
    bullets: [
      "Key contributor to drafting Pakistan's National Artificial Intelligence (AI) Policy 2025.",
      "Advise on ethical AI use, data governance and sovereign AI frameworks aligned with national digital-economy goals and CPEC opportunities.",
    ],
  },
  {
    id: "reshmatex",
    title: "COO & Managing Director / CTO",
    org: "Reshmatex & Textile Group",
    where: "Lahore, Pakistan",
    period: "2009 — Present",
    tag: "INDUSTRY 2.0 → 4.0",
    bullets: [
      "Physical AI & Industry 4.0: designed and deployed a full SCADA system across batch production lines — PLCs, variable-frequency inverters and industrial IoT sensors.",
      "Impact: cut daily human error rate in batch production from 12% to 6% (50% reduction) via real-time data acquisition and automated fault detection.",
      "Digital Transformation: implemented a Manufacturer-to-Consumer (M2C) commerce system, bypassing traditional distribution layers and boosting profitability.",
      "OT/IT Integration: directed group-level integration of Operational Technology with IT infrastructure for centralized production-KPI monitoring.",
    ],
  },
  {
    id: "asiafoam",
    title: "Founder & Director",
    org: "Asia Foam",
    where: "Pakistan",
    period: "5-Year Lifecycle",
    tag: "MANUFACTURING SCALE-UP",
    bullets: [
      "Founded, built and scaled a foam manufacturing business through a full restructuring.",
      "Achieved an 80% sales recovery post-restructuring and exceeded PKR 300 Million in annual revenue.",
    ],
  },
  {
    id: "trade",
    title: "International Business Consultant",
    org: "Global Trade & Expansion",
    where: "Indonesia · China · Singapore · Thailand · Saudi Arabia",
    period: "8 Years",
    tag: "CROSS-BORDER OPERATIONS",
    bullets: [
      "Managed cross-border business operations, contract negotiations and strategic alliance formation across five markets.",
      "Leveraged Chinese manufacturing relationships to facilitate CPEC technology procurement and industrial AI partnerships.",
    ],
  },
];

export const EDUCATION = [
  { id: "siena", degree: "Bachelor of Science (B.S.)", school: "Siena College, New York, USA", period: "2017 — 2018" },
  { id: "tcs", degree: "O & A Levels", school: "The City School, Pakistan", period: "FOUNDATION" },
];

export const CERTIFICATIONS = [
  { id: "cka", name: "Certified Kubernetes Administrator (CKA)", issuer: "The Linux Foundation", code: "CERT-K8S-CKA" },
  { id: "tf", name: "Certified TensorFlow Developer", issuer: "Google / TensorFlow", code: "CERT-TF-DEV" },
  { id: "pt", name: "Certified PyTorch Developer", issuer: "Meta / PyTorch", code: "CERT-PT-DEV" },
];

export const LEADERSHIP = [
  {
    id: "aip",
    role: "Co-Founder",
    org: "AIPakistani.com & AIMarhaba.com",
    note: "Pakistan's leading community platforms for generative AI awareness, education and networking.",
  },
  {
    id: "faculty",
    role: "Visiting Faculty",
    org: "UMT · Quaid College · The City School · Lahore Chamber of Commerce",
    note: "Cutting-edge curricula on AI, Machine Learning and Digital Transformation.",
  },
  {
    id: "mun",
    role: "Mentor & Judge",
    org: "Model United Nations & Youth Tech Initiatives",
    note: "Fostering diplomatic and technological leadership in Pakistan's next generation.",
  },
  {
    id: "oss",
    role: "Open Source Maintainer",
    org: "github.com/Mrww305",
    note: "Active maintainer of ML pipeline repositories — mlops-enterprise-pipeline · digicard · rtx · litgpt.",
    url: "https://github.com/Mrww305",
  },
];

export const OPEN_TO = [
  {
    id: "exec",
    track: "Executive / Lead Engineering",
    detail: "VP of AI · Chief AI Officer · Lead MLOps Engineer · Director of AI Infrastructure",
  },
  {
    id: "consult",
    track: "Technical Consultation",
    detail: "Secure multimodal AI deployments · Zero Trust AI architecture · National & corporate AI policy formulation",
  },
  {
    id: "academia",
    track: "Academic & Mentorship",
    detail: "Data science research · AI security · Democratizing tech education for underrepresented demographics",
  },
];
