"use client";

import { cn } from "./cn";

type QuestionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function QuestionCard({ title, description, children, className }: QuestionCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-white/[0.07] bg-[#0a0a0a]/80 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur-sm",
        "p-8 md:p-10",
        className,
      )}
    >
      <div className="mb-8 space-y-2">
        <h2 className="font-space text-2xl md:text-[1.65rem] font-semibold tracking-tight text-white">{title}</h2>
        {description ? (
          <p className="text-[15px] md:text-base text-gray-500 leading-relaxed max-w-lg">{description}</p>
        ) : null}
      </div>
      <div className="space-y-10">{children}</div>
    </div>
  );
}
