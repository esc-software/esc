import { SITE } from "@/config/site";

export type AreaIcon = "web" | "ecommerce" | "enterprise" | "iot" | "ai";

export interface Area {
  icon: AreaIcon;
  title: string;
  tags: string[];
  desc: string;
  extra: string;
  stat?: string;
  statLabel?: string;
}

export interface Content {
  ids: {
    home: string;
    clients: string;
    services: string;
    process: string;
    faq: string;
    contact: string;
  };
  hero: {
    logoAlt: string;
    established: string;
    headline: [string, string];
    srOnly: string;
    /** Text between *asterisks* is highlighted. */
    lead: string;
    stats: { end: number; suffix: string; label: string; short: string }[];
    cta: string;
  };
  clients: { label: string; title: string; altSuffix: string };
  services: { label: string; title: string; intro: string; outro: string; areas: Area[] };
  process: {
    label: string;
    title: string;
    phases: string;
    steps: { title: string; desc: string; deliverables: string[] }[];
  };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  contact: {
    title: string;
    intro: string;
    hoursLabel: string;
    hours: string;
    fields: { name: string; email: string; message: string };
    send: string;
    sending: string;
    sent: string;
    success: string;
    error: string;
  };
  footer: {
    tagline: string;
    logoAlt: string;
    address: string;
    hoursLabel: string;
    founder: string;
    social: string;
  };
  chat: {
    greeting: string;
    ariaLabel: string;
    title: string;
    clear: string;
    send: string;
    placeholder: string;
    thinking: string;
    blocked: string;
    noResponse: string;
    connectionError: string;
  };
}

const YEARS_ACTIVE = new Date().getFullYear() - SITE.foundingYear;

export const content: Content = {
  ids: {
    home: "home",
    clients: "clients",
    services: "services",
    process: "process",
    faq: "faq",
    contact: "contact",
  },
  hero: {
    logoAlt: "ESC Software logo",
    established: "Est. 2020",
    headline: ["We Build", "The Future"],
    srOnly:
      ", a software house in São Paulo that builds websites, custom systems and e-commerce stores.",
    lead: "We build *websites, systems and e-commerce* with uncompromising *precision* and *security*.",
    stats: [
      { end: 478, suffix: "+", label: "Projects Delivered", short: "Projects" },
      { end: YEARS_ACTIVE, suffix: "+", label: "Years of Excellence", short: "Years" },
      { end: 24, suffix: "/7", label: "Always Online", short: "Online" },
    ],
    cta: "Start a project",
  },
  clients: { label: "Trusted By", title: "Our Clients", altSuffix: "client of ESC Software" },
  services: {
    label: "Engineering",
    title: "Our Services",
    intro:
      "We engineer websites, systems and online stores across the full stack — from low-level computing to large-scale distributed infrastructure.",
    outro: "Every layer is designed for performance, resilience, and scalability.",
    areas: [
      {
        icon: "web",
        title: "Websites & Web Platforms",
        tags: ["React", "Next.js", "TypeScript", "Landing Pages", "SEO", "PWA"],
        desc: "Corporate websites, landing pages and web platforms engineered for speed, conversion, and long-term maintainability.",
        extra: "Optimized for Core Web Vitals, SEO, accessibility, and high-conversion UX.",
        stat: "250+",
        statLabel: "applications delivered",
      },
      {
        icon: "ecommerce",
        title: "E-commerce & Online Stores",
        tags: ["Custom Stores", "Payments", "Shipping", "ERP"],
        desc: "Online stores built from scratch or on platforms like Shopify, Nuvemshop and Wix, from setup and theme customization to integrations.",
        extra: "Payments, shipping, inventory and ERP integrations focused on checkout conversion.",
      },
      {
        icon: "enterprise",
        title: "Custom Systems & Enterprise Software",
        tags: ["Microservices", "REST", "GraphQL", "ERP", "Dashboards"],
        desc: "Custom systems and distributed architectures designed for mission-critical operations.",
        extra: "Observability, fault tolerance and horizontal scaling.",
        stat: "99.9%",
        statLabel: "availability SLA",
      },
      {
        icon: "iot",
        title: "Embedded & IoT",
        tags: ["Embedded C", "C++", "MQTT", "Automation", "Edge"],
        desc: "Real-time systems integrating hardware and software.",
        extra: "Low-latency communication and edge intelligence.",
        stat: "50+",
        statLabel: "devices deployed",
      },
      {
        icon: "ai",
        title: "Artificial Intelligence",
        tags: ["ML", "LLM", "NLP", "Vision", "RPA"],
        desc: "AI systems focused on automation and prediction.",
        extra: "Optimized pipelines with real-time inference.",
        stat: "12M+",
        statLabel: "events processed",
      },
    ],
  },
  process: {
    label: "How We Operate",
    title: "Process",
    phases: "PHASES",
    steps: [
      {
        title: "Discovery",
        desc: "Deep dive into business model, constraints, and objectives. We define scope, risks, and technical direction upfront.",
        deliverables: ["Requirements mapping", "System architecture", "Risk analysis"],
      },
      {
        title: "Blueprint",
        desc: "We translate strategy into a production-ready blueprint covering UX, system design, and infrastructure.",
        deliverables: ["Technical specification", "Design system", "Infra definition"],
      },
      {
        title: "Engineering",
        desc: "Agile development with weekly iterations, CI/CD pipelines, and continuous validation.",
        deliverables: ["Weekly builds", "Code review & QA", "CI/CD pipeline"],
      },
      {
        title: "Hardening",
        desc: "Final optimization phase focused on security, performance, and production stability.",
        deliverables: ["Security audit", "Performance tuning", "Monitoring"],
      },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Questions",
    items: [
      {
        q: "What's the average delivery timeline?",
        a: "Simple projects: 2–4 weeks. Enterprise systems: 2–6 months. Every project gets a detailed timeline after initial technical analysis.",
      },
      {
        q: "Do you work under NDA?",
        a: "Mandatory. Every project is protected by confidentiality agreements. Discretion is part of our operational DNA.",
      },
      {
        q: "How does 24/7 support work?",
        a: "Dedicated channels with contractual SLA. On-call team for critical systems with sub-15-minute response time.",
      },
      {
        q: "Do you operate internationally?",
        a: "Yes. Clients across 4 continents. Communication in Portuguese, English, and Spanish. Time zones aren't an obstacle.",
      },
      {
        q: "What's your core tech stack?",
        a: "React, Next.js, TypeScript, Node.js, Python, Go, PostgreSQL, Redis, Docker, Kubernetes, AWS/GCP. Stack is selected per project requirements.",
      },
      {
        q: "Where is ESC located and when can I reach you?",
        a: "We are in São Paulo, Brazil (R. Padre Jacinto de Carvalhais, 44, Jardim Santo Andre, 08390-350). Hours: Monday to Thursday 10:00–18:00 and Friday 10:00–13:00 (Brasília time). Send a message anytime and we'll respond within 24 hours.",
      },
    ],
  },
  contact: {
    title: "Let's Talk",
    intro:
      "Every project begins with a conversation. Tell us what you need and we’ll respond within 24 hours.",
    hoursLabel: "Opening hours",
    hours: "Mon–Thu 10:00–18:00 · Fri 10:00–13:00 (Brasília time)",
    fields: { name: "Name", email: "Email", message: "Message" },
    send: "Send",
    sending: "Sending...",
    sent: "Sent",
    success: "Message sent successfully.",
    error: "Error sending message. Please try again or email us.",
  },
  footer: {
    tagline: "Software Engineering",
    logoAlt: "ESC Software logo",
    address: "Address",
    hoursLabel: "Hours",
    founder: "Founded by Flavio Luiz (flazo0)",
    social: "Social",
  },
  chat: {
    greeting: "Hello. I'm the ESC assistant. How can I help?",
    ariaLabel: "Chat",
    title: "Chat",
    clear: "Clear conversation",
    send: "Send message",
    placeholder: "Message...",
    thinking: "thinking...",
    blocked: "Request not allowed.",
    noResponse: "No response",
    connectionError: "Error connecting to server. Try again later.",
  },
};
