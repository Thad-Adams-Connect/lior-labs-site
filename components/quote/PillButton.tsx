"use client";

import { cn } from "./cn";
import { HoverInfoCard } from "./HoverInfoCard";

type PillButtonProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  info?: string;
  disabled?: boolean;
  className?: string;
};

export function PillButton({ selected, onClick, children, info, disabled, className }: PillButtonProps) {
  const btn = (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a4de6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
        selected
          ? "border-[#6134C1]/80 bg-[#6134C1]/20 text-white"
          : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-gray-200",
        disabled && "opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );

  if (info) {
    return <HoverInfoCard info={info}>{btn}</HoverInfoCard>;
  }
  return btn;
}
