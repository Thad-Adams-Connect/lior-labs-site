import type { QuoteFormState, QuotePayload } from "./types";
import { resolveStep3ContextId, resolveStep3ContextKey, resolveStep3ContextLabel } from "./option-copy";

function buildFeaturesContext(state: QuoteFormState): Pick<
  QuotePayload["features"],
  "contextualFocusKey" | "contextualFocusOptionId" | "contextualFocusLabel"
> {
  const id = resolveStep3ContextId(state);
  const key = resolveStep3ContextKey(state);
  const label = resolveStep3ContextLabel(state);
  if (!id || !key || !label) return {};
  return {
    contextualFocusKey: key,
    contextualFocusOptionId: id,
    contextualFocusLabel: label,
  };
}

export function buildQuotePayload(state: QuoteFormState): QuotePayload {
  if (!state.projectType || !state.existingPlatform || !state.complexity) {
    throw new Error("Invalid form state for submission");
  }

  const base: QuotePayload = {
    submittedAt: new Date().toISOString(),
    projectOverview: {
      projectType: state.projectType,
      businessDescription: state.businessDescription.trim(),
      existingPlatform: state.existingPlatform,
      ...(state.existingPlatform === "yes" && state.existingPlatformDescription.trim()
        ? { existingPlatformDescription: state.existingPlatformDescription.trim() }
        : {}),
    },
    goals: {
      mainGoal: state.mainGoal.trim(),
      priorities: [...state.priorities],
      notes: state.goalsNotes.trim(),
    },
    features: {
      projectType: state.projectType,
      ...buildFeaturesContext(state),
      selectedFeatures: [...state.featureSelections],
    },
    scope: {
      complexity: state.complexity,
      ongoingSupport: state.ongoingSupport ?? "",
      contentReadiness: state.contentReadiness ?? "",
      ...(state.complexity === "advanced" && state.complianceRelevant
        ? {
            compliance: {
              hasStrictRequirements: state.complianceRelevant === "yes",
              notes: state.complianceNotes.trim(),
            },
          }
        : {}),
    },
    budgetAndTimeline: {
      budgetRange: state.budgetRange ?? "",
      timeline: state.timeline ?? "",
      readinessToStart: state.readinessToStart ?? "",
      ...(state.timeline === "asap" && state.timelineScopeTradeoff
        ? { timelineScopeTradeoff: state.timelineScopeTradeoff }
        : {}),
      ...(state.budgetRange === "unsure" && state.budgetContextNote.trim()
        ? { budgetContextNote: state.budgetContextNote.trim() }
        : {}),
    },
    contact: {
      name: state.contactName.trim(),
      email: state.contactEmail.trim(),
      businessName: state.businessName.trim(),
      notes: state.notes.trim(),
    },
  };

  if (state.projectType === "ecommerce") {
    base.features = {
      ...base.features,
      productCountEstimate: state.productCountEstimate.trim(),
      integrationsNotes: state.integrationsNotes.trim(),
    };
  }

  return base;
}
