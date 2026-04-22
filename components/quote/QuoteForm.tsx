"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { ProgressBar } from "./ProgressBar";
import { StepRenderer } from "./StepRenderer";
import { initialQuoteFormState, type QuoteFormState } from "./types";
import { buildQuotePayload } from "./quote-payload";
import { validateStep } from "./validation";

type FormDataType = ReturnType<typeof buildQuotePayload>;

const TOTAL_STEPS = 6;

const stepMotion = {
  initial: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 28 : -28,
    filter: "blur(4px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -20 : 20,
    filter: "blur(4px)",
  }),
};

export function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>(initialQuoteFormState);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitFormData = useCallback(
    async (formData: FormDataType) => {
      try {
        setError(null);
        setIsSubmitting(true);

        console.log("[quote] payload", formData);

        const res = await fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          let msg = "Submission failed";

          const text = await res.text();
          if (text.trim()) {
            msg = text;
            try {
              const json = JSON.parse(text) as unknown;
              if (json && typeof json === "object" && "error" in json) {
                const err = (json as { error?: unknown }).error;
                if (typeof err === "string" && err.trim()) msg = err;
              }
            } catch {
              // ignore
            }
          }

          throw new Error(msg);
        }

        setIsSuccess(true);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Something went wrong submitting your request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const goNext = useCallback(() => {
    const msg = validateStep(step, form);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step, form]);

  const goBack = useCallback(() => {
    setError(null);
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting || isSuccess) return;
      const msg = validateStep(6, form);
      if (msg) {
        setError(msg);
        return;
      }
      setError(null);
      try {
        const payload = buildQuotePayload(form);
        void submitFormData(payload);
      } catch {
        setError("Something went wrong preparing your request. Please try again.");
      }
    },
    [form, isSubmitting, isSuccess, submitFormData],
  );

  const startOver = useCallback(() => {
    setForm(initialQuoteFormState);
    setStep(1);
    setDirection(1);
    setError(null);
    setIsSubmitting(false);
    setIsSuccess(false);
  }, []);

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[1.75rem] border border-white/[0.07] bg-[#0a0a0a]/90 p-10 md:p-12 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur-sm text-center space-y-6"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6134C1]/20 border border-[#6134C1]/30">
          <Sparkles className="h-7 w-7 text-[#c4a8ff]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-space text-2xl md:text-3xl font-semibold text-white tracking-tight">
            Request received
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-md mx-auto">
            We&apos;ll review your answers and follow up shortly with a tailored proposal. Your details were logged
            for our team.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={startOver} className="px-8">
          Submit another request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={step === TOTAL_STEPS ? handleSubmit : (e) => e.preventDefault()} className="space-y-10">
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

      <div className="relative min-h-[320px] md:min-h-[380px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepRenderer step={step} form={form} setForm={setForm} />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error ? (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-sm text-red-400/90 text-center -mt-4"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="border-white/15 px-6 py-4 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <span className="hidden sm:block h-[52px] w-[120px] shrink-0" aria-hidden />
        )}

        {step < TOTAL_STEPS ? (
          <Button type="button" variant="primary" onClick={goNext} className="px-8 py-4 rounded-full text-[15px]">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || isSuccess}
            className="px-8 py-4 rounded-full text-[15px]"
          >
            {isSuccess ? "Request Received" : isSubmitting ? "Submitting…" : "Review & Generate Proposal"}
            <Sparkles className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
