"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";

export default function QuotePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center relative overflow-hidden">
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
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
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
              setStep(2);
            }}
          >
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
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Project Type
                  </label>
                  <select
                    required
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all appearance-none"
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
                    rows={5}
                    required
                    placeholder="Tell us about your goals, features you need, and timeline..."
                    className="w-full bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#6134C1] focus:ring-1 focus:ring-[#6134C1] transition-all resize-none"
                  />
                </div>

                <div className="pt-6 flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-5"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    className="w-2/3 py-5 text-lg"
                    onClick={() => alert("Form submitted! (Mock)")}
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
