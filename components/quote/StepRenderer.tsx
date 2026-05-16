"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectType, QuoteFormState } from "./types";
import {
  GOALS_STEP_INTRO,
  showBudgetGuidancePrompt,
  showComplianceFollowUp,
  showExistingPlatformFollowUp,
  showTimelinePressureFollowUp,
  step3ContextQuestion,
} from "./conditional-logic";
import { QuestionCard } from "./QuestionCard";
import { OptionCard } from "./OptionCard";
import { PillButton } from "./PillButton";
import { HoverInfoCard } from "./HoverInfoCard";
import { cn } from "./cn";
import {
  BUDGET_OPTIONS,
  COMPLIANCE_RELEVANT_OPTIONS,
  COMPLEXITY_OPTIONS,
  CONTENT_READINESS_OPTIONS,
  ECOMMERCE_SITUATION_OPTIONS,
  EXISTING_PLATFORM_OPTIONS,
  MOBILE_PLATFORM_OPTIONS,
  ONGOING_SUPPORT_OPTIONS,
  PRODUCT_COUNT_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  START_READINESS_OPTIONS,
  TIMELINE_OPTIONS,
  TIMELINE_SCOPE_TRADEOFF_OPTIONS,
  WEB_APP_AUDIENCE_OPTIONS,
  WEBSITE_PRIMARY_PURPOSE_OPTIONS,
  featuresForProjectType,
  goalsForProjectType,
  prioritiesForProjectType,
} from "./option-copy";

type StepRendererProps = {
  step: number;
  form: QuoteFormState;
  setForm: React.Dispatch<React.SetStateAction<QuoteFormState>>;
};

const inputClass =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-[15px] text-white placeholder:text-gray-600 " +
  "focus:border-[#6134C1]/60 focus:outline-none focus:ring-1 focus:ring-[#6134C1]/40 transition-all";

const labelClass = "block text-sm font-medium text-gray-400 mb-3";

export function StepRenderer({ step, form, setForm }: StepRendererProps) {
  const setProjectType = (projectType: ProjectType) => {
    setForm((prev) => ({
      ...prev,
      projectType,
      mainGoal: "",
      priorities: [],
      websitePrimaryPurpose: null,
      ecommerceSituation: null,
      webAppAudience: null,
      mobileTargetPlatforms: null,
      featureSelections: [],
      productCountEstimate: "",
      integrationsNotes: "",
    }));
  };

  const toggleFeature = (id: string) => {
    setForm((prev) => {
      const next = new Set(prev.featureSelections);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, featureSelections: [...next] };
    });
  };

  const togglePriority = (id: string) => {
    if (!form.projectType) return;
    const allowedIds = prioritiesForProjectType(form.projectType).map((p) => p.id);
    if (!allowedIds.includes(id)) return;
    setForm((prev) => {
      const p = prev.priorities;
      if (p.includes(id)) {
        return { ...prev, priorities: p.filter((x) => x !== id) };
      }
      if (p.length >= 2) return prev;
      return { ...prev, priorities: [...p, id] };
    });
  };

  const renderStep3Context = () => {
    if (!form.projectType) return null;
    const ctx = step3ContextQuestion(form.projectType);
    const opts =
      ctx.kind === "website"
        ? WEBSITE_PRIMARY_PURPOSE_OPTIONS
        : ctx.kind === "ecommerce"
          ? ECOMMERCE_SITUATION_OPTIONS
          : ctx.kind === "web_app"
            ? WEB_APP_AUDIENCE_OPTIONS
            : MOBILE_PLATFORM_OPTIONS;

    const selected =
      ctx.kind === "website"
        ? form.websitePrimaryPurpose
        : ctx.kind === "ecommerce"
          ? form.ecommerceSituation
          : ctx.kind === "web_app"
            ? form.webAppAudience
            : form.mobileTargetPlatforms;

    const setSelected = (id: string) => {
      if (ctx.kind === "website") setForm((p) => ({ ...p, websitePrimaryPurpose: id }));
      else if (ctx.kind === "ecommerce") setForm((p) => ({ ...p, ecommerceSituation: id }));
      else if (ctx.kind === "web_app") setForm((p) => ({ ...p, webAppAudience: id }));
      else setForm((p) => ({ ...p, mobileTargetPlatforms: id }));
    };

    return (
      <div>
        <p className={labelClass}>{ctx.label}</p>
        <p className="text-sm text-gray-600 mb-4 -mt-2">{ctx.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {opts.map((opt) => (
            <OptionCard key={opt.id} selected={selected === opt.id} onClick={() => setSelected(opt.id)}>
              <span className="text-[15px] font-medium">{opt.label}</span>
            </OptionCard>
          ))}
        </div>
      </div>
    );
  };

  if (step === 1) {
    return (
      <QuestionCard
        title="Project overview"
        description="Your answers here decide which questions you’ll see next."
      >
        <div>
          <p className={labelClass}>What are you looking to build?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                selected={form.projectType === opt.id}
                onClick={() => setProjectType(opt.id)}
                info={opt.info}
              >
                <span className="font-medium">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="business-desc" className={labelClass}>
            What best describes your business?
          </label>
          <textarea
            id="business-desc"
            value={form.businessDescription}
            onChange={(e) => setForm((p) => ({ ...p, businessDescription: e.target.value }))}
            placeholder="Industry, audience, and what you sell or offer…"
            rows={4}
            className={cn(inputClass, "resize-none min-h-[120px]")}
          />
        </div>

        <div>
          <p className={labelClass}>Do you have an existing platform?</p>
          <div className="flex flex-wrap gap-2">
            {EXISTING_PLATFORM_OPTIONS.map((opt) => (
              <PillButton
                key={opt.id}
                selected={form.existingPlatform === opt.id}
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    existingPlatform: opt.id,
                    existingPlatformDescription: opt.id === "yes" ? p.existingPlatformDescription : "",
                  }))
                }
              >
                {opt.label}
              </PillButton>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showExistingPlatformFollowUp(form) ? (
            <motion.div
              key="platform-followup"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <label htmlFor="platform-desc" className={labelClass}>
                What are you using today?
              </label>
              <p className="text-sm text-gray-600 mb-3 -mt-2">
                Stack, vendor, or URL — helps us plan migration, SEO, and risk.
              </p>
              <textarea
                id="platform-desc"
                value={form.existingPlatformDescription}
                onChange={(e) => setForm((p) => ({ ...p, existingPlatformDescription: e.target.value }))}
                placeholder="e.g. Shopify Plus at brand.com, custom Laravel admin…"
                rows={3}
                className={cn(inputClass, "resize-none")}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </QuestionCard>
    );
  }

  if (step === 2) {
    if (!form.projectType) {
      return (
        <QuestionCard title="Goals" description="Complete step 1 to unlock tailored goal options.">
          <p className="text-gray-500 text-sm">Project type is required for the next questions.</p>
        </QuestionCard>
      );
    }

    const goalList = goalsForProjectType(form.projectType);
    const priorityList = prioritiesForProjectType(form.projectType);

    return (
      <QuestionCard
        title="Goals"
        description={GOALS_STEP_INTRO[form.projectType]}
      >
        <div>
          <p className={labelClass}>Main goal of the project</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goalList.map((g) => (
              <OptionCard
                key={g.id}
                selected={form.mainGoal === g.id}
                onClick={() => setForm((p) => ({ ...p, mainGoal: g.id }))}
              >
                <span className="font-medium">{g.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>What matters most? (choose up to two)</p>
          <div className="flex flex-wrap gap-2">
            {priorityList.map((opt) => (
              <PillButton
                key={opt.id}
                selected={form.priorities.includes(opt.id)}
                onClick={() => togglePriority(opt.id)}
                disabled={!form.priorities.includes(opt.id) && form.priorities.length >= 2}
              >
                {opt.label}
              </PillButton>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="goals-notes" className={labelClass}>
            Anything else we should know? <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <textarea
            id="goals-notes"
            value={form.goalsNotes}
            onChange={(e) => setForm((p) => ({ ...p, goalsNotes: e.target.value }))}
            placeholder="Constraints, stakeholders, inspiration links…"
            rows={3}
            className={cn(inputClass, "resize-none")}
          />
        </div>
      </QuestionCard>
    );
  }

  if (step === 3 && form.projectType) {
    const meta = featuresForProjectType(form.projectType);

    return (
      <QuestionCard
        title="Features & focus"
        description={
          form.projectType === "ecommerce"
            ? "First we align on situation and platforms—then catalog and checkout depth."
            : form.projectType === "web_app"
              ? "Audience drives auth and UX—then we map product capabilities."
              : form.projectType === "mobile_app"
                ? "Platforms drive build approach—then native capabilities."
                : "Primary purpose shapes IA—then we pick site modules."
        }
      >
        {renderStep3Context()}

        <div>
          <p className={labelClass}>Which areas should we plan for?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {meta.map((item) => {
              const selected = form.featureSelections.includes(item.id);
              const toggle = (
                <button
                  type="button"
                  onClick={() => toggleFeature(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a4de6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
                    selected
                      ? "border-[#6134C1]/80 bg-[#6134C1]/12 text-white"
                      : "border-white/[0.08] bg-white/[0.02] text-gray-300 hover:border-white/12",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                      selected ? "border-[#6134C1] bg-[#6134C1]/30" : "border-white/10 bg-white/[0.03]",
                    )}
                  >
                    {selected ? <Check className="h-4 w-4 text-white" strokeWidth={2.5} /> : null}
                  </span>
                  <span>{item.label}</span>
                </button>
              );

              return item.info ? (
                <HoverInfoCard key={item.id} info={item.info}>
                  {toggle}
                </HoverInfoCard>
              ) : (
                <div key={item.id}>{toggle}</div>
              );
            })}
          </div>
        </div>

        {form.projectType === "ecommerce" ? (
          <>
            <div>
              <p className={labelClass}>Rough number of products</p>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_COUNT_OPTIONS.map((opt) => (
                  <PillButton
                    key={opt.id}
                    selected={form.productCountEstimate === opt.id}
                    onClick={() => setForm((p) => ({ ...p, productCountEstimate: opt.id }))}
                  >
                    {opt.label}
                  </PillButton>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="integrations" className={labelClass}>
                Integrations <span className="text-gray-600 font-normal">(ERP, CRM, shipping, etc.)</span>
              </label>
              <textarea
                id="integrations"
                value={form.integrationsNotes}
                onChange={(e) => setForm((p) => ({ ...p, integrationsNotes: e.target.value }))}
                placeholder="e.g. Shopify → NetSuite, ShipStation, tax engine…"
                rows={3}
                className={cn(inputClass, "resize-none")}
              />
            </div>
          </>
        ) : null}
      </QuestionCard>
    );
  }

  if (step === 3 && !form.projectType) {
    return (
      <QuestionCard title="Features" description="Go back to step 1 and select a project type first.">
        <p className="text-gray-500 text-sm">Project type is required to show tailored feature options.</p>
      </QuestionCard>
    );
  }

  if (step === 4) {
    return (
      <QuestionCard
        title="Scope"
        description="Complexity unlocks follow-up questions about regulation and risk."
      >
        <div>
          <p className={labelClass}>Project complexity</p>
          <div className="grid grid-cols-1 gap-3">
            {COMPLEXITY_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                selected={form.complexity === opt.id}
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    complexity: opt.id,
                    ...(opt.id !== "advanced" ? { complianceRelevant: null, complianceNotes: "" } : {}),
                  }))
                }
                info={opt.info}
              >
                <span className="font-medium">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showComplianceFollowUp(form) ? (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4"
            >
              <div>
                <p className={labelClass}>Compliance or regulation?</p>
                <p className="text-sm text-gray-600 mb-3 -mt-2">
                  HIPAA, SOC 2, GDPR, PCI, or industry rules change architecture and delivery.
                </p>
                <div className="flex flex-wrap gap-2">
                  {COMPLIANCE_RELEVANT_OPTIONS.map((opt) => (
                    <PillButton
                      key={opt.id}
                      selected={form.complianceRelevant === opt.id}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          complianceRelevant: opt.id,
                          complianceNotes: opt.id === "no" ? "" : p.complianceNotes,
                        }))
                      }
                    >
                      {opt.label}
                    </PillButton>
                  ))}
                </div>
              </div>
              <AnimatePresence initial={false}>
                {form.complianceRelevant === "yes" ? (
                  <motion.div
                    key="compliance-notes"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <label htmlFor="compliance-notes" className={labelClass}>
                      Briefly describe requirements
                    </label>
                    <textarea
                      id="compliance-notes"
                      value={form.complianceNotes}
                      onChange={(e) => setForm((p) => ({ ...p, complianceNotes: e.target.value }))}
                      placeholder="Frameworks, regions, data classes, audit expectations…"
                      rows={4}
                      className={cn(inputClass, "resize-none")}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div>
          <p className={labelClass}>Ongoing support after launch</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ONGOING_SUPPORT_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                selected={form.ongoingSupport === opt.id}
                onClick={() => setForm((p) => ({ ...p, ongoingSupport: opt.id }))}
              >
                <span className="text-[15px] font-medium">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>Content readiness</p>
          <div className="flex flex-wrap gap-2">
            {CONTENT_READINESS_OPTIONS.map((opt) => (
              <PillButton
                key={opt.id}
                selected={form.contentReadiness === opt.id}
                onClick={() => setForm((p) => ({ ...p, contentReadiness: opt.id }))}
              >
                {opt.label}
              </PillButton>
            ))}
          </div>
        </div>
      </QuestionCard>
    );
  }

  if (step === 5) {
    return (
      <QuestionCard
        title="Budget & timeline"
        description="We only ask about scope tradeoffs when your timeline is aggressive."
      >
        <div>
          <p className={labelClass}>Budget range</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BUDGET_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                selected={form.budgetRange === opt.id}
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    budgetRange: opt.id,
                    budgetContextNote: opt.id === "unsure" ? p.budgetContextNote : "",
                  }))
                }
                className="py-3.5 px-4"
              >
                <span className="text-sm font-medium">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showBudgetGuidancePrompt(form) ? (
            <motion.div
              key="budget-context"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28 }}
            >
              <label htmlFor="budget-context" className={labelClass}>
                What would help us understand budget? <span className="text-gray-600 font-normal">(optional)</span>
              </label>
              <textarea
                id="budget-context"
                value={form.budgetContextNote}
                onChange={(e) => setForm((p) => ({ ...p, budgetContextNote: e.target.value }))}
                placeholder="Rough ARR, funding stage, or what you’re comparing against…"
                rows={3}
                className={cn(inputClass, "resize-none")}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div>
          <p className={labelClass}>Timeline</p>
          <div className="flex flex-wrap gap-2">
            {TIMELINE_OPTIONS.map((opt) => (
              <PillButton
                key={opt.id}
                selected={form.timeline === opt.id}
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    timeline: opt.id,
                    timelineScopeTradeoff: opt.id === "asap" ? p.timelineScopeTradeoff : null,
                  }))
                }
              >
                {opt.label}
              </PillButton>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showTimelinePressureFollowUp(form) ? (
            <motion.div
              key="timeline-tradeoff"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <p className={labelClass}>ASAP — how flexible is scope vs. the date?</p>
              <p className="text-sm text-gray-600 mb-4 -mt-2">
                Helps us propose phasing without surprises.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TIMELINE_SCOPE_TRADEOFF_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    selected={form.timelineScopeTradeoff === opt.id}
                    onClick={() => setForm((p) => ({ ...p, timelineScopeTradeoff: opt.id }))}
                    className="py-3.5"
                  >
                    <span className="text-sm font-medium">{opt.label}</span>
                  </OptionCard>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div>
          <p className={labelClass}>Readiness to start</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {START_READINESS_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.id}
                selected={form.readinessToStart === opt.id}
                onClick={() => setForm((p) => ({ ...p, readinessToStart: opt.id }))}
                className="py-4"
              >
                <span className="font-medium">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      </QuestionCard>
    );
  }

  if (step === 6) {
    return (
      <QuestionCard
        title="Contact"
        description="We’ll follow up with a tailored proposal and next steps."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-1">
            <label htmlFor="contact-name" className={labelClass}>
              Name
            </label>
            <input
              id="contact-name"
              autoComplete="name"
              value={form.contactName}
              onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
              className={inputClass}
              placeholder="Alex Rivera"
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.contactEmail}
              onChange={(e) => setForm((p) => ({ ...p, contactEmail: e.target.value }))}
              className={inputClass}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="business-name" className={labelClass}>
            Business name <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <input
            id="business-name"
            value={form.businessName}
            onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
            className={inputClass}
            placeholder="Company or brand"
          />
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            Notes <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            placeholder="Links, competitors, must-haves, or questions for us…"
            rows={5}
            className={cn(inputClass, "resize-none min-h-[140px]")}
          />
        </div>
      </QuestionCard>
    );
  }

  if (step === 7) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Review Your Answers</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-400">Project Type</h3>
            <p className="text-white">{form.projectType || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Business Description</h3>
            <p className="text-white">{form.businessDescription || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Main Goal</h3>
            <p className="text-white">{form.mainGoal || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Priorities</h3>
            <p className="text-white">{form.priorities.length > 0 ? form.priorities.join(", ") : "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Contact Name</h3>
            <p className="text-white">{form.contactName || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Contact Email</h3>
            <p className="text-white">{form.contactEmail || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Business Name</h3>
            <p className="text-white">{form.businessName || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-400">Notes</h3>
            <p className="text-white">{form.notes || "Not provided"}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
