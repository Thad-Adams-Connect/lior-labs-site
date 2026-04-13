"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Internal Next.js route, renders a <Link> */
  to?: string;
  /** External or arbitrary href, renders a <Link> or <a> */
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({
  to,
  href,
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 overflow-hidden px-6 py-3";

  const variants = {
    primary:
      "bg-[#6134C1] text-white hover:bg-[#7245d2] shadow-[0_0_20px_rgba(97,52,193,0.2)] hover:shadow-[0_0_30px_rgba(97,52,193,0.5)] border border-[#7a4de6]/30",
    secondary:
      "bg-white/10 text-white hover:bg-white/15 border border-white/5 backdrop-blur-sm",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
  };

  const classes = cn(base, variants[variant], className);
  const inner = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  );

  const linkHref = to ?? href;

  if (linkHref) {
    return (
      <Link href={linkHref} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <motion.button className={classes} {...(props as any)}>
      {inner}
    </motion.button>
  );
}
