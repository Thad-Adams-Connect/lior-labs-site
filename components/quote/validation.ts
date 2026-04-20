import type { QuoteFormState } from "./types";
import {
  showComplianceFollowUp,
  showExistingPlatformFollowUp,
  showTimelinePressureFollowUp,
} from "./conditional-logic";
import { isMainGoalValidForProjectType, prioritiesForProjectType } from "./option-copy";

export function validateStep(step: number, state: QuoteFormState): string | null {
  switch (step) {
    case 1:
      if (!state.projectType) return "Choose what you’re looking to build.";
      if (state.businessDescription.trim().length < 2)
        return "Add a short description of your business.";
      if (!state.existingPlatform) return "Let us know if you have an existing platform.";
      if (showExistingPlatformFollowUp(state)) {
        if (state.existingPlatformDescription.trim().length < 8) {
          return "Describe your current setup in a sentence or two (8+ characters).";
        }
      }
      return null;

    case 2: {
      if (!state.projectType) return "Complete step 1 first.";
      if (!state.mainGoal.trim() || !isMainGoalValidForProjectType(state.projectType, state.mainGoal)) {
        return "Pick the goal that best matches this project.";
      }
      if (state.priorities.length < 1) return "Pick what matters most (up to two).";
      const allowed = new Set(prioritiesForProjectType(state.projectType).map((p) => p.id));
      if (state.priorities.some((id) => !allowed.has(id))) {
        return "Update your priorities so they match your project type.";
      }
      return null;
    }

    case 3: {
      if (!state.projectType) return "Project type is required.";
      switch (state.projectType) {
        case "website":
          if (!state.websitePrimaryPurpose) return "Choose what the site should prioritize first.";
          break;
        case "ecommerce":
          if (!state.ecommerceSituation) return "Tell us where the store stands today.";
          break;
        case "web_app":
          if (!state.webAppAudience) return "Select who primarily uses the product.";
          break;
        case "mobile_app":
          if (!state.mobileTargetPlatforms) return "Choose target platforms.";
          break;
        default:
          break;
      }
      if (state.featureSelections.length < 1)
        return "Select at least one feature or area to focus on.";
      if (state.projectType === "ecommerce") {
        if (!state.productCountEstimate.trim()) return "Estimate how many products you’ll sell.";
      }
      return null;
    }

    case 4:
      if (!state.complexity) return "Choose a complexity level.";
      if (showComplianceFollowUp(state)) {
        if (!state.complianceRelevant) return "Let us know if compliance or regulation applies.";
        if (state.complianceRelevant === "yes" && state.complianceNotes.trim().length < 8) {
          return "Add a short note on requirements (e.g. HIPAA, SOC 2, regions).";
        }
      }
      if (!state.ongoingSupport) return "Select your support preference.";
      if (!state.contentReadiness) return "Tell us about content readiness.";
      return null;

    case 5:
      if (!state.budgetRange) return "Select a budget range.";
      if (!state.timeline) return "Choose a timeline.";
      if (showTimelinePressureFollowUp(state) && !state.timelineScopeTradeoff) {
        return "Tell us how flexible scope is relative to your date.";
      }
      if (!state.readinessToStart) return "When are you ready to start?";
      return null;

    case 6: {
      if (!state.contactName.trim()) return "Enter your name.";
      const email = state.contactEmail.trim();
      if (!email) return "Enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
      return null;
    }
    default:
      return null;
  }
}
