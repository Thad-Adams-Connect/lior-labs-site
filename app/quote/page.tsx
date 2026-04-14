"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="page-shell safe-x min-dvh flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6134C1]/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-black backdrop-blur-xl"
        >
          <div className="mb-12">
            <h1 className="font-space text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let&apos;s build{" "}
              <span className="text-[#6134C1]">something.</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Fill out the details below and we&apos;ll get back to you within
              24 hours.
            </p>
          </div>

          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 1) {
                setStep(2);
                return;
              }

              setIsSubmitted(true);
              e.currentTarget.reset();
              setStep(1);
            }}
          >
            {isSubmitted ? (
              <p className="rounded-2xl border border-[#6134C1]/30 bg-[#6134C1]/10 px-4 py-3 text-sm text-purple-100">
                Thanks. Your quote request has been captured and is ready for follow-up.
              </p>
            ) : null}

            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      autoComplete="name"
                      className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      autoComplete="email"
                      inputMode="email"
                      className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    defaultValue=""
                    required
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all"
                  >
                    <option value="" disabled className="text-gray-600">
                      Select an option
                    </option>
                    <option value="website">Marketing Website</option>
                    <option value="webapp">Web Application</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Budget Range
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["<$5k", "$5k-10k", "$10k-25k", "$25k+"].map((budget) => (
                      <label key={budget} className="cursor-pointer">
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          className="peer sr-only"
                          required
                        />
                        <div className="text-center rounded-xl border border-white/10 bg-[#111111] py-3 text-sm text-gray-400 peer-checked:border-[#6134C1] peer-checked:bg-[#6134C1]/10 peer-checked:text-white transition-all hover:bg-white/5">
                          {budget}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-5 text-lg"
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    rows={5}
                    required
                    placeholder="Tell us about your goals, features you need, and timeline..."
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all resize-none"
                  />
                </div>

                <div className="pt-6 flex flex-col gap-4 sm:flex-row">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-1/3 py-5"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-2/3 py-5 text-lg"
                  >
                    Submit Request
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
