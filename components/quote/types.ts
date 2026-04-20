export type ProjectType = "website" | "ecommerce" | "web_app" | "mobile_app";

export type ExistingPlatform = "yes" | "no" | "unsure";

export type Complexity = "simple" | "moderate" | "advanced";

export type ComplianceRelevant = "yes" | "no";

export interface QuoteFormState {
  projectType: ProjectType | null;
  businessDescription: string;
  existingPlatform: ExistingPlatform | null;
  /** Shown only when existingPlatform === "yes" */
  existingPlatformDescription: string;

  mainGoal: string;
  priorities: string[];
  goalsNotes: string;

  /** Step 3 — one required contextual answer per project type */
  websitePrimaryPurpose: string | null;
  ecommerceSituation: string | null;
  webAppAudience: string | null;
  mobileTargetPlatforms: string | null;

  featureSelections: string[];
  productCountEstimate: string;
  integrationsNotes: string;

  complexity: Complexity | null;
  ongoingSupport: string | null;
  contentReadiness: string | null;
  /** Only when complexity === "advanced" */
  complianceRelevant: ComplianceRelevant | null;
  complianceNotes: string;

  budgetRange: string | null;
  timeline: string | null;
  readinessToStart: string | null;
  /** Only when timeline === "asap" */
  timelineScopeTradeoff: string | null;
  /** Optional when budgetRange === "unsure" */
  budgetContextNote: string;

  contactName: string;
  contactEmail: string;
  businessName: string;
  notes: string;
}

export const initialQuoteFormState: QuoteFormState = {
  projectType: null,
  businessDescription: "",
  existingPlatform: null,
  existingPlatformDescription: "",

  mainGoal: "",
  priorities: [],
  goalsNotes: "",

  websitePrimaryPurpose: null,
  ecommerceSituation: null,
  webAppAudience: null,
  mobileTargetPlatforms: null,

  featureSelections: [],
  productCountEstimate: "",
  integrationsNotes: "",

  complexity: null,
  ongoingSupport: null,
  contentReadiness: null,
  complianceRelevant: null,
  complianceNotes: "",

  budgetRange: null,
  timeline: null,
  readinessToStart: null,
  timelineScopeTradeoff: null,
  budgetContextNote: "",

  contactName: "",
  contactEmail: "",
  businessName: "",
  notes: "",
};

export type QuotePayload = {
  submittedAt: string;
  projectOverview: {
    projectType: ProjectType;
    businessDescription: string;
    existingPlatform: ExistingPlatform;
    existingPlatformDescription?: string;
  };
  goals: {
    mainGoal: string;
    priorities: string[];
    notes: string;
  };
  features: {
    projectType: ProjectType;
    contextualFocusKey?: string;
    contextualFocusOptionId?: string;
    contextualFocusLabel?: string;
    selectedFeatures: string[];
    productCountEstimate?: string;
    integrationsNotes?: string;
  };
  scope: {
    complexity: Complexity;
    ongoingSupport: string;
    contentReadiness: string;
    compliance?: {
      hasStrictRequirements: boolean;
      notes: string;
    };
  };
  budgetAndTimeline: {
    budgetRange: string;
    timeline: string;
    readinessToStart: string;
    timelineScopeTradeoff?: string;
    budgetContextNote?: string;
  };
  contact: {
    name: string;
    email: string;
    businessName: string;
    notes: string;
  };
};
