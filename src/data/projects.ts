import type { Locale, Localized } from "@/i18n/config";

/**
 * Featured projects.
 *
 * To add a project, copy the template at the bottom of this file into the
 * `projects` array. Its case-study pages (/en|fr|ar/projects/<slug>) and its
 * homepage showcase are generated automatically.
 */

export type ProjectCover =
  /** Built-in illustrated covers (no screenshots needed). */
  | { kind: "bocaro" }
  | { kind: "iot" }
  /** A real screenshot placed in /public, e.g. "/projects/my-app.png" (16:10 works best). */
  | { kind: "image"; src: string; alt: Localized<string> };

export type ProjectText = {
  title: string;
  category: string;
  /** One sentence for the homepage showcase. */
  summary: string;
  /** Full description for the case-study page. */
  description: string;
  highlights: string[];
};

export type Project = {
  slug: string;
  status: "in-progress" | "completed";
  stack: string[];
  cover: ProjectCover;
  links: {
    /** Public URL of the live project. Omit if not deployed. */
    live?: string;
    /** Repository URL. Omit if private; the GitHub button only appears when set. */
    github?: string;
  };
  text: Localized<ProjectText>;
};

export const projects: Project[] = [
  {
    slug: "bocaro",
    status: "in-progress",
    stack: ["Next.js", "JavaScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    cover: { kind: "bocaro" },
    links: {},
    text: {
      en: {
        title: "BOCARO",
        category: "Showcase Website / Web Development",
        summary:
          "A showcase website for a ceramic and tile business: product catalogue, product simulator, WhatsApp contact and an admin area to manage products. Currently in development.",
        description:
          "A showcase website for a ceramic and tile business. It presents the product range, lets visitors preview products with a simulator, and connects them with the business directly through WhatsApp. An administration area lets the business manage its products. The project is still in development.",
        highlights: [
          "Responsive product catalogue",
          "Product presentation",
          "Product simulator",
          "Direct WhatsApp contact",
          "Product management",
          "Admin dashboard",
        ],
      },
      fr: {
        title: "BOCARO",
        category: "Site vitrine / Développement web",
        summary:
          "Un site vitrine pour une entreprise de céramique et de carrelage : catalogue produits, simulateur, contact WhatsApp et espace d’administration pour gérer les produits. En cours de développement.",
        description:
          "Un site vitrine pour une entreprise de céramique et de carrelage. Il présente la gamme de produits, permet aux visiteurs de les visualiser grâce à un simulateur et les met directement en relation avec l’entreprise via WhatsApp. Un espace d’administration permet à l’entreprise de gérer ses produits. Le projet est toujours en cours de développement.",
        highlights: [
          "Catalogue produits responsive",
          "Présentation des produits",
          "Simulateur de produits",
          "Contact direct via WhatsApp",
          "Gestion des produits",
          "Tableau de bord d’administration",
        ],
      },
      ar: {
        title: "BOCARO",
        category: "موقع تعريفي / تطوير الويب",
        summary:
          "موقع تعريفي لشركة خزف وبلاط: كتالوج المنتجات، ومحاكي للمنتجات، وتواصل عبر واتساب، ولوحة إدارة لتسيير المنتجات. قيد التطوير حاليًا.",
        description:
          "موقع تعريفي لشركة خزف وبلاط. يعرض تشكيلة المنتجات، ويتيح للزوار معاينتها عبر محاكي، ويربطهم مباشرة بالشركة عبر واتساب. وتتيح لوحة الإدارة للشركة تسيير منتجاتها. المشروع لا يزال قيد التطوير.",
        highlights: [
          "كتالوج منتجات متجاوب",
          "عرض المنتجات",
          "محاكي المنتجات",
          "تواصل مباشر عبر واتساب",
          "إدارة المنتجات",
          "لوحة تحكّم للإدارة",
        ],
      },
    },
  },
  {
    slug: "iot-device-monitoring",
    status: "completed",
    stack: ["Flutter", "PHP", "MySQL", "IoT"],
    cover: { kind: "iot" },
    links: {},
    text: {
      en: {
        title: "IoT Device Monitoring",
        category: "Mobile Development / IoT",
        summary:
          "A mobile application to monitor connected devices, manage objects, visualize their location and receive alerts.",
        description:
          "A mobile application designed to monitor connected devices, manage objects, visualize location information, and receive alerts.",
        highlights: [
          "Device monitoring",
          "Object management",
          "Location visualization",
          "Alert functionality",
        ],
      },
      fr: {
        title: "Surveillance d’objets connectés",
        category: "Développement mobile / IoT",
        summary:
          "Une application mobile pour surveiller des objets connectés, gérer les appareils, visualiser leur position et recevoir des alertes.",
        description:
          "Une application mobile conçue pour surveiller des objets connectés, gérer les appareils, visualiser les informations de localisation et recevoir des alertes.",
        highlights: [
          "Surveillance des appareils",
          "Gestion des objets",
          "Visualisation de la localisation",
          "Système d’alertes",
        ],
      },
      ar: {
        title: "مراقبة أجهزة إنترنت الأشياء",
        category: "تطوير تطبيقات الهاتف / إنترنت الأشياء",
        summary:
          "تطبيق هاتف لمراقبة الأجهزة المتصلة، وإدارة الأجهزة، وعرض مواقعها، وتلقّي التنبيهات.",
        description:
          "تطبيق هاتف مصمَّم لمراقبة الأجهزة المتصلة، وإدارة الأجهزة، وعرض معلومات الموقع، وتلقّي التنبيهات.",
        highlights: ["مراقبة الأجهزة", "إدارة الأجهزة", "عرض الموقع على الخريطة", "نظام التنبيهات"],
      },
    },
  },

  /* ---------------------------------------------------------------
     TEMPLATE: copy into the array above when your next project is ready.
     ---------------------------------------------------------------
  {
    slug: "project-slug",
    status: "completed",
    stack: ["Next.js", "TypeScript"],
    cover: {
      kind: "image",
      src: "/projects/project-slug.png",
      alt: { en: "Screenshot of …", fr: "Capture d’écran de …", ar: "لقطة شاشة لـ …" },
    },
    links: { live: "https://…", github: "https://github.com/…" },
    text: {
      en: { title: "…", category: "…", summary: "…", description: "…", highlights: ["…"] },
      fr: { title: "…", category: "…", summary: "…", description: "…", highlights: ["…"] },
      ar: { title: "…", category: "…", summary: "…", description: "…", highlights: ["…"] },
    },
  },
  --------------------------------------------------------------- */
];

/**
 * While there are fewer than this many projects, an "open slot" panel is shown
 * after the last project, inviting visitors to get in touch.
 */
export const SHOWCASE_SLOTS = 3;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectNumber(slug: string) {
  return String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
}

export function projectText(project: Project, locale: Locale) {
  return project.text[locale];
}
