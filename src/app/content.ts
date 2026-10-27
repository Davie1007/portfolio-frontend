export const SITE = {
  name: 'David Karanja',
  role: 'Full-stack engineer · Business systems · ERP · 3D web',
  location: 'Thika, Kenya · working with clients worldwide',
  email: 'hello@karanjadavid.com',
  apiUrl: '',
  // Hero product shot (used in the 3D-tilted hero frame).
  heroShot: 'assets/hero.webp',
  heroShotAlt:
    'Creator Studio 3D editor — a product on a turntable being customised in the browser',
};

export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'How I work', href: '#approach' },
  { label: 'Back a project', href: '#support' },
  { label: 'Testimonials', href: '#testimonials' },
];

// Short trust strip under the hero. Use sector labels now; swap `logo` in later.
export const TRUST_STRIP = {
  intro: 'Systems currently running in production for',
  items: [
    { label: 'Retail & distribution', logo: '' },
    { label: 'Logistics & delivery', logo: '' },
    { label: 'Property & construction', logo: '' },
  ],
};

export const PROMISES = [
  {
    title: 'Systems your team actually uses',
    text: 'I model how your business really runs — not how a flowchart says it should — then build the smallest system that fits. Delivered working, with tests on the rules that must never break.',
  },
  {
    title: 'AI where it beats the simpler alternative',
    text: 'Language models, forecasting and anomaly detection earn their place only when they outperform a rules engine or a spreadsheet. With evaluation sets, confidence thresholds and human review — not demos that collapse in production.',
  },
  {
    title: 'Full ownership at handover',
    text: 'Fixed scope, weekly demos, documentation and training. The code, the data and the decisions are yours when we finish. No lock-in, no black boxes.',
  },
];

export const capabilities = [
  {
    title: 'Full-stack engineering',
    icon: 'assets/capabilities/fullstack.svg',
    text: 'Angular, React, TypeScript, Laravel, Spring Boot — web apps and internal tools designed for growth and handed over with tests and documentation.',
  },
  {
    title: 'ERP & business systems',
    icon: 'assets/capabilities/erp.svg',
    text: 'Multi-tenant Dolibarr deployments, custom internal tools, booking and operations platforms modelled on how your team actually works.',
  },
  {
    title: '3D & interactive web',
    icon: 'assets/capabilities/3d.svg',
    text: 'Three.js product configurators, data-heavy dashboards and trading interfaces engineered for latency and real workloads.',
  },
  {
    title: 'Data engineering & integration',
    icon: 'assets/capabilities/data.svg',
    text: 'Pipelines that clean, validate and join data from spreadsheets, APIs and databases into one reliable source — with connections to the tools you already pay for.',
  },
  {
    title: 'AI features, production-grade',
    icon: 'assets/capabilities/ai.svg',
    text: 'LLM-powered extraction, Q&A, triage and assistants grounded in your documents and APIs, with evaluation sets and human-in-the-loop review.',
  },
  {
    title: 'Statistical modelling',
    icon: 'assets/capabilities/stats.svg',
    text: 'Forecasting, anomaly detection and optimisation applied where a number has to be right — with intervals, stated assumptions and benchmarks on your data.',
  },
];

export const SERVICES = [
  {
    title: 'Custom business systems',
    image: 'assets/work/erp.png',
    imageAlt: 'Custom business system dashboard',
    text: 'Internal tools, booking and operations platforms modelled precisely on how your team actually works, with the workflows, permissions and audit trails your business needs.',
    result: 'Less spreadsheet juggling, fewer errors, one source of truth.',
  },
  {
    title: 'API integrations & backend scaling',
    image: 'assets/work/api.png',
    imageAlt: 'Backend architecture diagram',
    text: 'Connecting legacy software, automating manual data entry between platforms, and optimizing databases so your infrastructure doesn’t buckle as your user base grows.',
    result: 'Eliminated manual copy-pasting and zero downtime during traffic spikes.',
  },
  {
    title: 'SaaS product development',
    image: 'assets/work/saas.png',
    imageAlt: 'Software-as-a-service user platform',
    text: 'Turning your business idea into a market-ready web application. Built with secure authentication, multi-tenant billing, and clean code that your future in-house team can easily scale.',
    result: 'A launch-ready product built right the first time, ready for paying users.',
  },
  {
    title: '3D and data-heavy web apps',
    image: 'assets/work/customiser.png',
    imageAlt: '3D product customiser interface',
    text: 'Product customisers, trading dashboards and analytics that stay smooth under real data volumes — engineered for latency, not just looks.',
    result: 'Customers see and shape the product before buying.',
  },
];

export const STEPS = [
  {
    title: 'Listen',
    text: 'We talk through your business, not the technology. I write back what I understood.',
  },
  {
    title: 'Model',
    text: 'I turn your process and your data into a precise model: entities, rules, edge cases — and where AI genuinely helps.',
  },
  { title: 'Build', text: 'Small increments, demoed weekly, so you can steer early.' },
  {
    title: 'Verify',
    text: 'Automated tests check the rules that must never break, and evaluation harnesses check any AI output.',
  },
  { title: 'Hand over', text: 'Documentation, training and full ownership of the code and data.' },
];

export const IDEAS = [
  {
    title: 'Modelling the business',
    math: 'order: new → paid → packed → shipped',
    text: 'Every order, booking or invoice follows a defined life cycle. I map it as an explicit state machine in the code, so no record ends up in a state nobody planned for — and an AI assistant can be safely constrained to act only on valid transitions.',
  },
  {
    title: 'Schema-validated AI output',
    math: 'LLM → schema → human review if P < 0.92',
    text: 'Language models are excellent at pulling fields out of messy documents, but they are probabilistic. I wrap them in JSON schema validation, confidence thresholds and a review queue, so downstream systems never see a guess as a fact.',
  },
  {
    title: 'Performance by design',
    math: 'indexed queries, not table scans',
    text: 'A report that takes a second with 100 rows can take an hour with 100,000. I choose data structures, indexes and query plans so your system stays fast as you grow — and I benchmark on your real data before promising a result.',
  },
  {
    title: 'Invariants in tests',
    math: 'stock ≥ 0, always',
    text: 'I write down the rules that must always hold — stock never negative, payments always matching invoices — and test them continuously, whether they are enforced by code or checked after an AI-generated action.',
  },
  {
    title: 'Evaluation before launch',
    math: 'precision / recall on 200 labelled cases',
    text: 'An AI feature is only as good as the cases it gets wrong. I build small labelled test sets from your own data so we can see, before launch, how often the system is right and where it needs a human.',
  },
  {
    title: 'Stated uncertainty',
    math: 'mean ± 2σ, not “about”',
    text: 'Forecasts and estimates come with intervals and stated assumptions, so you can decide how much to trust them. That is what separates analysis from guessing.',
  },
];

export const WORK = [
  {
    title: 'Creator Studio',
    image: 'assets/work/creator-studio.jpg',
    imageAlt: 'Creator Studio 3D editor with a product on a turntable',
    text: 'Print-on-demand design studio where customers design a product in 3D and order it, fulfilled through Printify.',
    stack: 'React, Three.js, Laravel',
    href: 'https://create.karanjadavid.com',
  },
  {
    title: 'Multi-tenant ERP',
    image: 'assets/work/erp.png',
    imageAlt: 'Dolibarr dashboard showing stock and sales summaries',
    text: 'Dolibarr ERP deployed for several businesses on one Safaricom Cloud installation, each with isolated data and its own reporting.',
    stack: 'Dolibarr, Linux, Safaricom Cloud',
    href: '',
  },
  {
    title: 'B2B Logistics & Delivery Tracker',
    image: 'assets/work/dispatch.png',
    imageAlt: 'Map interface with live delivery truck overlays',
    text: 'A real-time dispatch dashboard for a regional distributor managing fleet routing, driver assignments, and automated customer SMS alerts.',
    stack: 'React, Node.js, PostgreSQL, Google Maps API',
    href: '',
  },
  {
    title: 'M-Pesa Automated Reconciliation Engine',
    image: 'assets/work/reconcile.png',
    imageAlt: 'Financial ledger matching transactions automatically',
    text: 'A custom financial tool that fetches M-Pesa Daraja API statements, automatically matches payments to customer invoices, and highlights anomalies.',
    stack: 'Laravel, MySQL, Redis, Cron Jobs',
    href: '',
  },
  {
    title: '3D Real Estate Virtual Tour Platform',
    image: 'assets/work/property-3d.png',
    imageAlt: 'Interactive 3D apartment floor plan blueprint',
    text: 'An interactive web portal allowing property buyers to explore customizable residential estate layouts and finishings in full 3D.',
    stack: 'React, Three.js, WebGL, AWS S3',
    href: '',
  },
  {
    title: 'SaaS Billing & Subscription Gatekeeper',
    image: 'assets/work/saas-billing.png',
    imageAlt: 'Subscription management portal showing customer tiers',
    text: 'A plug-and-play middleware authentication system built to restrict API usage and web app features based on active user subscription tiers.',
    stack: 'Node.js, Express, JWT, MongoDB',
    href: '',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'He asked questions nobody else had asked, then delivered a system that matched how we actually run the shop.',
    name: 'Client name',
    role: 'Operations manager, retail business',
    placeholder: true,
  },
  {
    quote: 'Every Friday we saw something working. There were no surprises at launch.',
    name: 'Client name',
    role: 'Founder, online store',
    placeholder: true,
  },
  {
    quote:
      'The handover was thorough. My team could run and extend the system without calling him.',
    name: 'Client name',
    role: 'Director, services company',
    placeholder: true,
  },
];

// Donation tiers: a pledge at or above `min` earns that discount on a future project.
export const TIERS = [
  { min: 25, off: 5 },
  { min: 100, off: 10 },
  { min: 250, off: 15 },
];
export const PRESETS = [25, 100, 250];

// Funding campaigns. `backers` and `updates` make the section read like a real product.
export const FUNDING = [
  {
    id: 'creator',
    title: 'Creator Studio templates',
    text: 'More product templates and a faster 3D editor.',
    goal: 2000,
    raised: 0,
    backers: 0,
    updates: 'Shipping templates in weekly batches',
  },
  {
    id: 'nexus',
    title: 'NexusFX Pro open tools',
    text: 'Backtesting module and strategy documentation.',
    goal: 3000,
    raised: 0,
    backers: 0,
    updates: 'Backtesting module in development',
  },
  {
    id: 'erp',
    title: 'Dolibarr deployment kit',
    text: 'A reusable setup for small-business ERP in Kenya.',
    goal: 1500,
    raised: 0,
    backers: 0,
    updates: 'First deployment kit ships this quarter',
  },
];

export const TERMS = [
  'Your pledge goes to the project you choose.',
  'It earns a discount code for a project of yours, valid for 12 months.',
  'The discount applies to the fee on a signed quote, one code per project.',
  'Pledges support open projects and are not refundable.',
];

export const ABOUT = {
  heading: 'About David',
  portrait: 'assets/david.jpg',
  portraitAlt: 'David Karanja, full-stack engineer',
  bio: [
    "I'm a software engineer based in Thika, Kenya. I studied Mathematics and Computer Science, and I've spent the last few years building the systems small and mid-sized businesses actually run on — order management, ERP deployments, storefronts and 3D product tools.",
    "I work directly with the people who use the software, demo every week, and hand over the code, the docs and the decisions when we finish. If a project isn't the right fit, I say so before it starts.",
  ],
  facts: [
    { label: 'Based in', value: 'Thika, Kenya · working with clients worldwide' },
    { label: 'Studied', value: 'BSc Mathematics & Computer Science' },
    { label: 'Working since', value: '2021' },
    { label: 'Currently', value: 'Building Creator Studio and NexusFX Pro' },
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
    { label: 'GitHub', href: 'https://github.com/your-handle' },
  ],
};
