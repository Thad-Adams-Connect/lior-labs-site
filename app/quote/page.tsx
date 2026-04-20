"use client";

import { motion } from "motion/react";
import { QuoteForm } from "@/components/quote/QuoteForm";

export default function QuotePage() {
  return (
    <div className="page-shell safe-x min-dvh flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(90vw,560px)] h-[min(90vw,560px)] bg-[#6134C1]/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[min(80vw,420px)] h-[min(80vw,420px)] bg-white/[0.02] blur-[80px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[700px] mx-auto relative z-10 px-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-12 text-center space-y-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-600">Get a quote</p>
          <h1 className="font-space text-3xl md:text-[2.125rem] font-semibold tracking-tight text-white">
            Shape your next build
          </h1>
          <p className="text-gray-500 text-[15px] md:text-base leading-relaxed max-w-lg mx-auto">
            Questions adapt to your answers—so we only ask what&apos;s relevant, then follow up with a clear proposal.
          </p>
        </motion.div>

        <QuoteForm />
      </div>
    </div>
  );
}
