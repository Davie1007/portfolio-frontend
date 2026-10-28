/* ─── Site identity ─────────────────────────────────────────── */

export const SITE = {
  name: 'David Karanja',
  role: 'Full-stack engineer · Business systems · ERP · 3D web',
  location: 'Thika, Kenya · working with clients worldwide',
  email: 'hello@karanjadavid.com',
  apiUrl: '',
  heroShot: 'assets/hero.webp',
  heroShotAlt: 'Creator Studio 3D editor',
};

/* ─── Homepage nav ─────────────────────────────────────────── */

export const NAV = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contacts', href: '#contact' },
];

/* ─── Homepage content ─────────────────────────────────────── */

export const ABOUT = {
  heading: 'About David',
  portrait: 'assets/david.jpg',
  portraitAlt: 'David Karanja, full-stack engineer',
  bio: [
    "I'm a software engineer based in Thika, Kenya. I studied Mathematics and Computer Science, and I've spent the last few years building the systems small and mid-sized businesses actually run on — order management, ERP deployments, storefronts and 3D product tools.",
    "I work directly with the people who use the software, demo every week, and hand over the code, the docs and the decisions when we finish. If a project isn't the right fit, I say so before it starts.",
  ],
  facts: [
    { label: 'Based in', value: 'Thika, Kenya' },
    { label: 'Studied', value: 'BSc Mathematics & Computer Science' },
    { label: 'Working since', value: '2021' },
    { label: 'Currently', value: 'Creator Studio · NexusFX Pro' },
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
    { label: 'GitHub', href: 'https://github.com/your-handle' },
  ],
};

export const CAPABILITIES = [
  { title: 'Full-stack engineering', text: 'Angular, React, TypeScript, Laravel, Spring Boot.' },
  { title: 'ERP & business systems', text: 'Multi-tenant Dolibarr, custom internal tools.' },
  { title: '3D & interactive web', text: 'Three.js configurators, data-heavy dashboards.' },
  { title: 'Data engineering', text: 'Pipelines, validation, integration with existing tools.' },
  { title: 'Production AI', text: 'LLM extraction and assistants with eval sets.' },
  { title: 'Statistical modelling', text: 'Forecasting, anomaly detection, optimisation.' },
];

export const IDEAS = [
  {
    title: 'Modelling the business',
    text: 'Every order, booking or invoice follows a defined life cycle. I map it as an explicit state machine in the code, so no record ends up in a state nobody planned for — and an AI assistant can be safely constrained to act only on valid transitions.',
  },
  {
    title: 'Schema-validated AI output',
    text: 'Language models are excellent at pulling fields out of messy documents, but they are probabilistic. I wrap them in JSON schema validation, confidence thresholds and a review queue, so downstream systems never see a guess as a fact.',
  },
  {
    title: 'Performance by design',
    text: 'A report that takes a second with 100 rows can take an hour with 100,000. I choose data structures, indexes and query plans so your system stays fast as you grow — and I benchmark on your real data before promising a result.',
  },
  {
    title: 'Invariants in tests',
    text: 'I write down the rules that must always hold — stock never negative, payments always matching invoices — and test them continuously, whether they are enforced by code or checked after an AI-generated action.',
  },
  {
    title: 'Evaluation before launch',
    text: 'An AI feature is only as good as the cases it gets wrong. I build small labelled test sets from your own data so we can see, before launch, how often the system is right and where it needs a human.',
  },
  {
    title: 'Stated uncertainty',
    text: 'Forecasts and estimates come with intervals and stated assumptions, so you can decide how much to trust them. That is what separates analysis from guessing.',
  },
];

/* ─── Work (shown on homepage) ─────────────────────────────── */

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
    title: 'B2B Logistics Tracker',
    image: 'assets/work/dispatch.png',
    imageAlt: 'Map interface with live delivery truck overlays',
    text: 'A real-time dispatch dashboard for a regional distributor managing fleet routing, driver assignments, and automated customer SMS alerts.',
    stack: 'React, Node.js, PostgreSQL, Google Maps',
    href: '',
  },
  {
    title: 'M-Pesa Reconciliation Engine',
    image: 'assets/work/reconcile.png',
    imageAlt: 'Financial ledger matching transactions automatically',
    text: 'A financial tool that fetches M-Pesa Daraja statements, matches payments to invoices, and highlights anomalies.',
    stack: 'Laravel, MySQL, Redis, Cron',
    href: '',
  },
  {
    title: '3D Real Estate Tour Platform',
    image: 'assets/work/property-3d.png',
    imageAlt: 'Interactive 3D apartment floor plan',
    text: 'An interactive web portal allowing property buyers to explore residential estate layouts and finishings in full 3D.',
    stack: 'React, Three.js, WebGL, S3',
    href: '',
  },
  {
    title: 'SaaS Billing Gatekeeper',
    image: 'assets/work/saas-billing.png',
    imageAlt: 'Subscription management portal',
    text: 'A plug-and-play middleware authentication system built to restrict API usage and features based on active subscription tiers.',
    stack: 'Node.js, Express, JWT, MongoDB',
    href: '',
  },
];

/* ─── Hire-page content ────────────────────────────────────── */

export const SERVICES = [
  {
    title: 'Custom business systems',
    text: 'Internal tools, booking and operations platforms modelled on how your team actually works.',
    result: 'Less spreadsheet juggling, fewer errors, one source of truth.',
  },
  {
    title: 'API integrations & backend scaling',
    text: 'Connecting legacy software, automating manual data entry, and optimising databases so infrastructure doesn’t buckle as you grow.',
    result: 'Eliminated manual copy-pasting and zero downtime during traffic spikes.',
  },
  {
    title: 'SaaS product development',
    text: 'Turning your idea into a market-ready web app. Secure auth, multi-tenant billing, clean code your future team can extend.',
    result: 'A launch-ready product built right the first time.',
  },
  {
    title: '3D and data-heavy web apps',
    text: 'Product customisers, trading dashboards and analytics that stay smooth under real data volumes.',
    result: 'Customers see and shape the product before buying.',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'He asked questions nobody else had asked, then delivered a system that matched how we actually run the shop.',
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
    quote: 'The handover was thorough. My team could run and extend the system without calling him.',
    name: 'Client name',
    role: 'Director, services company',
    placeholder: true,
  },
];

export const TIERS = [
  { min: 25, off: 5 },
  { min: 100, off: 10 },
  { min: 250, off: 15 },
];
export const PRESETS = [25, 100, 250];

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

export const DEFAULT_FUNDING_ID = FUNDING[0].id;

export const TERMS = [
  'Your pledge goes to the project you choose.',
  'It earns a discount code for a project of yours, valid for 12 months.',
  'The discount applies to the fee on a signed quote, one code per project.',
  'Pledges support open projects and are not refundable.',
];

export const STEPS = [
  { title: 'Listen', text: 'We talk through your business, not the technology. I write back what I understood.' },
  { title: 'Model', text: 'I turn your process and data into a precise model: entities, rules, edge cases — and where AI genuinely helps.' },
  { title: 'Build', text: 'Small increments, demoed weekly, so you can steer early.' },
  { title: 'Verify', text: 'Automated tests check the rules that must never break; evaluation harnesses check AI output.' },
  { title: 'Hand over', text: 'Documentation, training and full ownership of the code and data.' },
];

export const TRUST_STRIP = {
  intro: 'Systems currently running in production for',
  items: [
    { label: 'Retail & distribution' },
    { label: 'Logistics & delivery' },
    { label: 'Property & construction' },
  ],
};

export const PROMISES = [
  {
    title: 'Systems your team actually uses',
    text: 'I model how your business really runs — not how a flowchart says it should — then build the smallest system that fits.',
  },
  {
    title: 'AI where it beats the simpler alternative',
    text: 'Language models, forecasting and anomaly detection earn their place only when they outperform a rules engine or a spreadsheet.',
  },
  {
    title: 'Full ownership at handover',
    text: 'Fixed scope, weekly demos, documentation and training. The code, the data and the decisions are yours.',
  },
];

export type DonationChannel = {
  id: string;
  label: string;
  description: string;
  url: string;
  kind: 'link' | 'mpesa';
  active: boolean;
};

export const DONATIONS = {
  heading: 'Support the work',
  intro: 'If something I built or wrote saved you time, you can chip in — no strings, no obligation.',
  mpesa: { paybill: '', till: '', account: 'support' },
  channels: [
    { id: 'bmac', label: 'Buy Me a Coffee', description: 'One-off tip via card.', url: 'https://buymeacoffee.com/your-handle', kind: 'link', active: true },
    { id: 'kofi', label: 'Ko-fi', description: 'One-off tip, no account needed.', url: 'https://ko-fi.com/your-handle', kind: 'link', active: false },
    { id: 'gh', label: 'GitHub Sponsors', description: 'Recurring support.', url: 'https://github.com/sponsors/your-handle', kind: 'link', active: false },
    { id: 'paypal', label: 'PayPal.me', description: 'One-off tip via PayPal.', url: 'https://paypal.me/your-handle', kind: 'link', active: false },
    { id: 'mpesa', label: 'M-Pesa', description: 'Send a one-off tip from Kenya.', url: '', kind: 'mpesa', active: false },
  ] as DonationChannel[],
};

export type DonationConfig = typeof DONATIONS;
