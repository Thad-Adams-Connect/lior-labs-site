"use client";

import { cn } from "./cn";
import { HoverInfoCard } from "./HoverInfoCard";

type OptionCardProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  /** Shown in a delayed floating card on hover */
  info?: string;
  disabled?: boolean;
};

export function OptionCard({
  selected,
  onClick,
  children,
  className,
  info,
  disabled,
}: OptionCardProps) {
  const inner = (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-2xl border px-5 py-4 transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a4de6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
        selected
          ? "border-[#6134C1]/80 bg-[#6134C1]/15 text-white shadow-[0_0_24px_rgba(97,52,193,0.15)]"
          : "border-white/[0.08] bg-white/[0.03] text-gray-200 hover:border-white/15 hover:bg-white/[0.06]",
        disabled && "opacity-40 pointer-events-none",
        className,
      )}
    >
      {children}
    </button>
  );

  if (info) {
    return <HoverInfoCard info={info}>{inner}</HoverInfoCard>;
  }

  return inner;
}
