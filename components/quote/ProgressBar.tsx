"use client";

import { cn } from "./cn";

const STEP_LABELS = ["Overview", "Goals", "Features", "Scope", "Plan", "Contact"];

type ProgressBarProps = {
  currentStep: number;
  totalSteps?: number;
  className?: string;
};

export function ProgressBar({ currentStep, totalSteps = 6, className }: ProgressBarProps) {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-600">
        <span>
          Step {currentStep} <span className="text-gray-500">/</span> {totalSteps}
        </span>
        <span className="text-gray-500 normal-case tracking-normal">{STEP_LABELS[currentStep - 1]}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6134C1] to-[#7a4de6] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between gap-1">
        {Array.from({ length: totalSteps }, (_, i) => {
          const n = i + 1;
          const done = n < currentStep;
          const active = n === currentStep;
          return (
            <div
              key={n}
              className="flex flex-1 flex-col items-center gap-2 min-w-0"
              aria-hidden
            >
              <div
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full transition-all duration-300",
                  done && "bg-[#6134C1]",
                  active && "bg-white scale-125 ring-2 ring-[#6134C1]/40",
                  !done && !active && "bg-white/15",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
