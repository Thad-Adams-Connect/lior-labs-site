import type { ProjectType, QuoteFormState } from "./types";

/** Step 1: follow-up only when they already have something live */
export function showExistingPlatformFollowUp(state: Pick<QuoteFormState, "existingPlatform">): boolean {
  return state.existingPlatform === "yes";
}

/** Step 4: compliance only when scope is advanced */
export function showComplianceFollowUp(state: Pick<QuoteFormState, "complexity">): boolean {
  return state.complexity === "advanced";
}

/** Step 5: trade-offs when timeline is aggressive */
export function showTimelinePressureFollowUp(state: Pick<QuoteFormState, "timeline">): boolean {
  return state.timeline === "asap";
}

/** Step 5: extra signal when budget is unknown */
export function showBudgetGuidancePrompt(state: Pick<QuoteFormState, "budgetRange">): boolean {
  return state.budgetRange === "unsure";
}

/** Step 3: one tailored question before the feature grid */
export const GOALS_STEP_INTRO: Record<ProjectType, string> = {
  website: "Goals are tuned for discovery, conversion, and editorial workflows on the web.",
  ecommerce: "We’ll align on revenue, catalog complexity, and operational load for your store.",
  web_app: "We’ll focus on users, permissions, and how the product fits into your stack.",
  mobile_app: "We’ll weigh acquisition, releases, and platform-specific UX for your app.",
};

export function step3ContextQuestion(
  projectType: ProjectType,
):
  | { kind: "website"; label: string; description: string }
  | { kind: "ecommerce"; label: string; description: string }
  | { kind: "web_app"; label: string; description: string }
  | { kind: "mobile_app"; label: string; description: string } {
  switch (projectType) {
    case "website":
      return {
        kind: "website",
        label: "What should this site do first?",
        description: "We’ll weight information architecture and CTAs around this.",
      };
    case "ecommerce":
      return {
        kind: "ecommerce",
        label: "Where is the store today?",
        description: "Helps us plan migration, SEO continuity, and technical risk.",
      };
    case "web_app":
      return {
        kind: "web_app",
        label: "Who is the primary user?",
        description: "Shapes auth, permissions, onboarding, and performance targets.",
      };
    case "mobile_app":
      return {
        kind: "mobile_app",
        label: "Target platforms",
        description: "Determines build approach, testing matrix, and release strategy.",
      };
  }
}
