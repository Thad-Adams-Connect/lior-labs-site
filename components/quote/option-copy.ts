import type { ExistingPlatform, ProjectType, QuoteFormState } from "./types";

/** Labels + delayed hover explanations for non-obvious options */
export const PROJECT_TYPE_OPTIONS = [
  {
    id: "website" as const,
    label: "Website",
    info: "Marketing sites, landing pages, and brochure-style experiences focused on storytelling and conversion.",
  },
  {
    id: "ecommerce" as const,
    label: "E-commerce",
    info: "Online storefronts with catalog, cart, checkout, and order flows—built to sell and scale.",
  },
  {
    id: "web_app" as const,
    label: "Web App",
    info: "Interactive software in the browser: dashboards, tools, and workflows with accounts and data.",
  },
  {
    id: "mobile_app" as const,
    label: "Mobile App",
    info: "Native or cross-platform apps for iOS and Android with device capabilities and app store delivery.",
  },
];

export const COMPLEXITY_OPTIONS = [
  {
    id: "simple" as const,
    label: "Simple",
    info: "Tight scope, few integrations, and clear requirements—fast to ship with minimal unknowns.",
  },
  {
    id: "moderate" as const,
    label: "Moderate",
    info: "Several features or integrations, some custom logic, and a bit of discovery along the way.",
  },
  {
    id: "advanced" as const,
    label: "Advanced",
    info: "Heavy customization, multiple systems, compliance, or scale—expects deeper architecture and iteration.",
  },
];

type FeatureMeta = { id: string; label: string; info?: string };

export const ECOMMERCE_FEATURES: FeatureMeta[] = [
  { id: "catalog", label: "Product catalog" },
  { id: "cart", label: "Shopping cart" },
  { id: "checkout", label: "Checkout" },
  { id: "payments", label: "Payments", info: "Stripe, PayPal, or similar—secure payment capture and payouts." },
  { id: "inventory", label: "Inventory" },
  { id: "shipping", label: "Shipping & rates" },
  { id: "accounts", label: "Customer accounts" },
  { id: "admin", label: "Admin / ops", info: "Back-office tools to manage products, orders, and fulfillment." },
];

export const WEB_APP_FEATURES: FeatureMeta[] = [
  { id: "accounts", label: "User accounts" },
  { id: "dashboard", label: "Dashboard" },
  { id: "api", label: "API integration", info: "Connect to third-party APIs, webhooks, or your own services." },
  { id: "admin", label: "Admin tools" },
  { id: "integrations", label: "Integrations", info: "CRM, analytics, auth providers, and other SaaS connections." },
  { id: "notifications", label: "Notifications" },
  { id: "search", label: "Search & filters" },
];

export const WEBSITE_FEATURES: FeatureMeta[] = [
  { id: "cms", label: "CMS / editable content" },
  { id: "seo", label: "SEO foundation" },
  { id: "landing", label: "Landing pages" },
  { id: "blog", label: "Blog / resources" },
  { id: "forms", label: "Lead forms" },
  { id: "analytics", label: "Analytics" },
  { id: "multilingual", label: "Multilingual" },
];

export const MOBILE_FEATURES: FeatureMeta[] = [
  { id: "accounts", label: "User accounts" },
  { id: "offline", label: "Offline mode", info: "Core flows work without connectivity and sync when back online." },
  { id: "push", label: "Push notifications" },
  { id: "payments", label: "In-app payments" },
  { id: "camera", label: "Camera / media" },
  { id: "integrations", label: "Integrations", info: "Backend APIs, auth, and third-party SDKs wired into the app." },
  { id: "analytics", label: "Analytics" },
];

export function featuresForProjectType(type: ProjectType): FeatureMeta[] {
  switch (type) {
    case "ecommerce":
      return ECOMMERCE_FEATURES;
    case "web_app":
      return WEB_APP_FEATURES;
    case "website":
      return WEBSITE_FEATURES;
    case "mobile_app":
      return MOBILE_FEATURES;
    default:
      return [];
  }
}

const GOALS_BY_TYPE: Record<ProjectType, { id: string; label: string }[]> = {
  website: [
    { id: "ws_leads", label: "Capture qualified leads" },
    { id: "ws_brand", label: "Build trust & credibility" },
    { id: "ws_launch", label: "Launch a new offer or line" },
    { id: "ws_seo", label: "Grow organic discovery" },
    { id: "ws_convert", label: "Improve conversion paths" },
  ],
  ecommerce: [
    { id: "ec_revenue", label: "Grow online revenue" },
    { id: "ec_checkout", label: "Fix checkout & drop-off" },
    { id: "ec_ops", label: "Streamline fulfillment & ops" },
    { id: "ec_expand", label: "Expand channels or regions" },
    { id: "ec_migrate", label: "Migrate or replatform" },
  ],
  web_app: [
    { id: "wa_efficiency", label: "Automate internal workflows" },
    { id: "wa_revenue", label: "Unlock new revenue streams" },
    { id: "wa_product", label: "Ship a customer-facing product" },
    { id: "wa_replace", label: "Replace legacy tools" },
    { id: "wa_scale", label: "Scale usage & reliability" },
  ],
  mobile_app: [
    { id: "mo_acquisition", label: "Acquire & retain users" },
    { id: "mo_revenue", label: "In-app revenue & subscriptions" },
    { id: "mo_brand", label: "Brand-owned mobile experience" },
    { id: "mo_field", label: "Field / offline-first workflows" },
    { id: "mo_companion", label: "Companion to web or hardware" },
  ],
};

export function goalsForProjectType(projectType: ProjectType): { id: string; label: string }[] {
  return GOALS_BY_TYPE[projectType];
}

export function isMainGoalValidForProjectType(projectType: ProjectType, mainGoal: string): boolean {
  return GOALS_BY_TYPE[projectType].some((g) => g.id === mainGoal);
}

const PRIORITY_CORE: { id: string; label: string }[] = [
  { id: "speed", label: "Speed to launch" },
  { id: "quality", label: "Craft & polish" },
  { id: "budget", label: "Budget efficiency" },
  { id: "scale", label: "Future scale" },
  { id: "support", label: "Ongoing partnership" },
];

/** Priorities shown depend on project type (conditional logic). */
export function prioritiesForProjectType(projectType: ProjectType): { id: string; label: string }[] {
  switch (projectType) {
    case "website":
      return [...PRIORITY_CORE, { id: "seo", label: "Discovery / SEO" }];
    case "ecommerce":
      return [...PRIORITY_CORE, { id: "conversion", label: "Checkout & conversion" }];
    case "web_app":
      return [...PRIORITY_CORE, { id: "reliability", label: "Uptime & reliability" }];
    case "mobile_app":
      return [...PRIORITY_CORE, { id: "app_release", label: "App store readiness" }];
    default:
      return PRIORITY_CORE;
  }
}

export function isPriorityIdValidForProjectType(projectType: ProjectType, id: string): boolean {
  return prioritiesForProjectType(projectType).some((p) => p.id === id);
}

export const BUDGET_OPTIONS = [
  { id: "under_10k", label: "Under $10k" },
  { id: "10k_25k", label: "$10k – $25k" },
  { id: "25k_50k", label: "$25k – $50k" },
  { id: "50k_100k", label: "$50k – $100k" },
  { id: "100k_plus", label: "$100k+" },
  { id: "unsure", label: "Not sure yet" },
];

export const TIMELINE_OPTIONS = [
  { id: "asap", label: "ASAP" },
  { id: "1_2mo", label: "1–2 months" },
  { id: "3_4mo", label: "3–4 months" },
  { id: "5_6mo", label: "5–6 months" },
  { id: "flexible", label: "Flexible" },
];

export const START_READINESS_OPTIONS = [
  { id: "now", label: "Ready now" },
  { id: "2_4w", label: "2–4 weeks" },
  { id: "1_2m", label: "1–2 months" },
  { id: "exploring", label: "Just exploring" },
];

export const ONGOING_SUPPORT_OPTIONS = [
  { id: "yes_retainer", label: "Yes — retainer" },
  { id: "yes_adhoc", label: "Yes — as needed" },
  { id: "no", label: "No — one-time build" },
  { id: "unsure", label: "Not sure" },
];

export const CONTENT_READINESS_OPTIONS = [
  { id: "ready", label: "Ready to go" },
  { id: "in_progress", label: "In progress" },
  { id: "need_help", label: "Need help creating it" },
];

export const EXISTING_PLATFORM_OPTIONS: { id: ExistingPlatform; label: string }[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unsure", label: "Not sure" },
];

export const PRODUCT_COUNT_OPTIONS = [
  { id: "under_25", label: "Under 25" },
  { id: "25_100", label: "25 – 100" },
  { id: "100_500", label: "100 – 500" },
  { id: "500_plus", label: "500+" },
  { id: "unsure", label: "Not sure yet" },
];

export const WEBSITE_PRIMARY_PURPOSE_OPTIONS = [
  { id: "marketing", label: "Marketing & storytelling" },
  { id: "leads", label: "Lead generation" },
  { id: "portfolio", label: "Portfolio & credibility" },
  { id: "product_hub", label: "Product or campaign hub" },
];

export const ECOMMERCE_SITUATION_OPTIONS = [
  { id: "new_build", label: "New build from scratch" },
  { id: "redesign", label: "Redesign on same stack" },
  { id: "migrate", label: "Migrate from another platform" },
  { id: "scale", label: "Scale an existing store" },
];

export const WEB_APP_AUDIENCE_OPTIONS = [
  { id: "internal", label: "Internal team / ops" },
  { id: "customers", label: "External customers" },
  { id: "both", label: "Internal & external" },
  { id: "partners", label: "Partners or vendors" },
];

export const MOBILE_PLATFORM_OPTIONS = [
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
  { id: "both_native", label: "Both (native apps)" },
  { id: "cross", label: "Cross-platform (one codebase)" },
];

export const COMPLIANCE_RELEVANT_OPTIONS: { id: "yes" | "no"; label: string }[] = [
  { id: "yes", label: "Yes — we have requirements" },
  { id: "no", label: "No — not a driver for this phase" },
];

export const TIMELINE_SCOPE_TRADEOFF_OPTIONS = [
  { id: "phase", label: "Happy to phase delivery" },
  { id: "descope", label: "Can trim non-essentials" },
  { id: "both", label: "Both phasing & trimming" },
  { id: "fixed", label: "Firm date — keep full scope" },
];

export function resolveStep3ContextId(state: QuoteFormState): string | undefined {
  const t = state.projectType;
  if (!t) return undefined;
  switch (t) {
    case "website":
      return state.websitePrimaryPurpose ?? undefined;
    case "ecommerce":
      return state.ecommerceSituation ?? undefined;
    case "web_app":
      return state.webAppAudience ?? undefined;
    case "mobile_app":
      return state.mobileTargetPlatforms ?? undefined;
    default:
      return undefined;
  }
}

export function resolveStep3ContextKey(state: QuoteFormState): string | undefined {
  switch (state.projectType) {
    case "website":
      return "website_primary_purpose";
    case "ecommerce":
      return "ecommerce_situation";
    case "web_app":
      return "web_app_audience";
    case "mobile_app":
      return "mobile_platforms";
    default:
      return undefined;
  }
}

export function resolveStep3ContextLabel(state: QuoteFormState): string | undefined {
  const t = state.projectType;
  if (!t) return undefined;
  switch (t) {
    case "website":
      return WEBSITE_PRIMARY_PURPOSE_OPTIONS.find((o) => o.id === state.websitePrimaryPurpose)?.label;
    case "ecommerce":
      return ECOMMERCE_SITUATION_OPTIONS.find((o) => o.id === state.ecommerceSituation)?.label;
    case "web_app":
      return WEB_APP_AUDIENCE_OPTIONS.find((o) => o.id === state.webAppAudience)?.label;
    case "mobile_app":
      return MOBILE_PLATFORM_OPTIONS.find((o) => o.id === state.mobileTargetPlatforms)?.label;
    default:
      return undefined;
  }
}
