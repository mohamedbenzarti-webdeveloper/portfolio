/**
 * English dictionary: the reference shape for every other language.
 *
 * Inline markup understood by `rich()`:
 *   **text** → highlighted text      _text_ → gradient serif emphasis
 */
const en = {
  meta: {
    title: "Mohamed Benzarti · Software Engineer / Web Developer",
    description:
      "Mohamed Benzarti is a Tunisian software engineering graduate and web developer building modern, accessible web experiences with React, Next.js and TypeScript.",
  },
  site: {
    role: "Software Engineer / Web Developer",
    location: "Tunisia",
  },
  nav: {
    items: {
      about: "About",
      skills: "Skills",
      work: "Work",
      services: "Services",
      journey: "Journey",
      contact: "Contact",
    },
    letsTalk: "Let’s talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primary: "Primary",
    mobile: "Mobile",
    home: "home",
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    skip: "Skip to content",
  },
  hero: {
    badge: "Open to opportunities",
    line1: "Building digital _experiences._",
    line2: "Turning ideas into _reality._",
    text: "I’m a software engineering graduate passionate about modern web development, building useful products, and solving real-world problems through technology.",
    ctaWork: "Explore My Work",
    ctaContact: "Let’s Connect",
    basedIn: "Based in",
    role: "Role",
    localTime: "Local time",
    scroll: "Scroll to explore",
    fig: "Fig. 01 · Systems in motion",
  },
  about: {
    label: "About",
    title:
      "I build for the web with an engineer’s foundation and a _product_ mindset, focused on work that is clean, useful and made to last.",
    p1: "My background is in **Software Engineering and Computer Systems**, with a Bachelor’s specialization in **IoT**: hardware, networks and the software that connects them.",
    p2: "Today I’m pursuing a **Master’s in E-commerce** while focusing on modern web development with React, Next.js, TypeScript and Node.js, learning by building real products.",
    facts: [
      { label: "Background", value: "Software Engineering / Computer Systems" },
      { label: "Bachelor’s", value: "Specialization in IoT" },
      { label: "Currently", value: "Master’s in E-commerce" },
      { label: "Focus", value: "Frontend & full-stack web" },
    ],
    bringTitle: "What I bring",
    strengths: [
      {
        title: "Technical foundation",
        text: "A Computer Systems degree specialized in IoT: networks, embedded systems and the software that ties them together.",
      },
      {
        title: "Web development",
        text: "Modern frontend and full-stack work with React, Next.js, Tailwind CSS and a growing TypeScript and Node.js practice.",
      },
      {
        title: "Problem-solving",
        text: "Breaking a problem down before writing code, and preferring the simplest solution that will hold up.",
      },
      {
        title: "Learning by experimenting",
        text: "Picking up new tools by building with them, then refining what I build as I learn.",
      },
      {
        title: "Building real projects",
        text: "Working on concrete briefs, like a showcase website for a ceramics and tile business.",
      },
    ],
  },
  skills: {
    label: "Skills & Technologies",
    title: "A growing toolkit, _honestly_ mapped.",
    intro: "Grouped by where I’ve actually used each tool, not by a self-assigned percentage.",
    legendTitle: "Highlight by experience",
    levels: {
      applied: { label: "Applied", description: "Used to build real projects" },
      deepening: { label: "Deepening", description: "Actively learning and practising" },
      foundation: { label: "Foundation", description: "Studied and used in coursework" },
    },
    groups: {
      frontend: { title: "Frontend", note: "Interfaces, components & styling" },
      backend: { title: "Backend", note: "Servers, routes & APIs" },
      database: { title: "Database", note: "Data modelling & storage" },
      other: { title: "Other", note: "Tools, languages & hardware" },
    },
    deepening: "Currently deepening",
  },
  work: {
    label: "Featured Projects",
    title: "Selected _work_, built to solve real problems.",
    intro:
      "A closer look at what I’ve built, from a showcase website for a ceramics business to a connected-device app.",
    viewProject: "View Project",
    technologies: "Technologies",
    status: { inProgress: "In progress", completed: "Completed" },
    live: "Live site",
    github: "GitHub",
    newTab: "(opens in a new tab)",
    slot: {
      label: "Next case study",
      title: "This slot is open for the _next_ build.",
      text: "New work will be added here as it ships. If you have a product, a website or an idea that needs building, it could be the one.",
      cta: "Start a conversation",
    },
  },
  covers: {
    catalogue: "Catalogue",
    simulator: "Product simulator",
    whatsapp: "Chat on WhatsApp",
    devices: "Devices",
    alert: "New alert",
    bocaroAlt: "Illustrated cover for BOCARO",
    iotAlt: "Illustrated cover for the IoT monitoring app",
  },
  project: {
    allProjects: "All projects",
    overview: "Overview",
    keyFeatures: "Key features",
    stack: "Technology stack",
    nextProject: "Next project",
    discuss: "Discuss a project",
    moreSoon: "More _soon._",
  },
  services: {
    label: "What I Can Build",
    title: "From first screen to _working_ product.",
    intro: "Where I can contribute today, as part of a team or on a well-scoped freelance project.",
    items: [
      {
        title: "Modern responsive websites",
        text: "Fast, accessible sites designed to work properly on every screen, from landing pages to multi-page business sites.",
      },
      {
        title: "Frontend development",
        text: "Turning designs into clean, component-based interfaces with React, Next.js and Tailwind CSS.",
      },
      {
        title: "Web applications",
        text: "Interactive applications with dashboards, forms and real workflows, built on modern full-stack tools.",
      },
      {
        title: "API integration",
        text: "Connecting interfaces to REST APIs and third-party services, with clear loading and error states.",
      },
      {
        title: "Database-driven apps",
        text: "Data models and create-read-update-delete workflows on PostgreSQL, MySQL, MongoDB or Supabase.",
      },
      {
        title: "E-commerce experiences",
        text: "Product catalogues and customer journeys, informed by hands-on work and my Master’s studies in e-commerce.",
      },
    ],
  },
  journey: {
    label: "Education & Journey",
    title: "From connected systems to the _modern_ web.",
    status: { completed: "Completed", inProgress: "In progress", ongoing: "Ongoing" },
    steps: [
      {
        phase: "Foundation",
        title: "Bachelor’s degree",
        detail: "Computer Systems · IoT specialization",
        text: "Hardware, networks, embedded systems and software fundamentals: how connected systems are designed end to end.",
      },
      {
        phase: "Expansion",
        title: "Master’s degree",
        detail: "E-commerce",
        text: "How digital products create value: online business models, customer experience and the platforms behind them.",
      },
      {
        phase: "Direction",
        title: "Modern web & software development",
        detail: "React · Next.js · TypeScript · Node.js",
        text: "Building real products, strengthening engineering practices and growing toward full-stack development.",
      },
    ],
  },
  contact: {
    label: "Contact",
    titleA: "Have an idea?",
    titleB: "Let’s build something",
    titleEm: "meaningful.",
    intro:
      "Whether it’s a junior developer role, a freelance project or a collaboration, I’d be glad to hear about it.",
    basedIn: "Based in Tunisia · GMT+1",
    channels: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      placeholder: "Placeholder",
      copy: "Copy email address",
      copied: "Email copied",
    },
    form: {
      required: "All fields are required.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "name@company.com",
      topic: "What’s it about?",
      topics: {
        job: "Job opportunity",
        freelance: "Freelance project",
        collaboration: "Collaboration",
        other: "Something else",
      },
      message: "Message",
      messagePlaceholder: "Tell me about the role, the project or the idea…",
      send: "Send message",
      sending: "Sending…",
      sendingStatus: "Sending your message…",
      errorTitle: "Your message wasn’t sent.",
      successTitle: "Message sent. Thank you!",
      successText: "I’ve received your message and will get back to you as soon as I can.",
      again: "Send another message",
    },
    errors: {
      nameRequired: "Please enter your name.",
      nameShort: "Your name looks a little short.",
      nameLong: "Please keep your name under 80 characters.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address, like name@company.com.",
      topicRequired: "Please choose what your message is about.",
      messageRequired: "Please write a short message.",
      messageShort: "Please add a bit more detail (at least {min} characters).",
      messageLong: "Please keep your message under {max} characters.",
      generic: "Something went wrong while sending your message.",
      invalid: "Invalid request.",
      checkFields: "Please check the highlighted fields.",
      notConfigured: "The contact form isn’t connected yet. Please reach out by email instead.",
      deliveryFailed: "The message couldn’t be delivered right now. Please try again or send an email.",
    },
  },
  footer: {
    backToTop: "Back to top",
  },
  notFound: {
    label: "Error 404",
    title: "This page doesn’t _exist_, yet.",
    text: "The link may be broken or the page may have moved.",
    home: "Back to home",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;

export default en satisfies Dictionary;
