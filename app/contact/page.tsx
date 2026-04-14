"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formId = useId();

  return (
    <div className="page-shell safe-x min-dvh">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-16 md:gap-24"
        >
          {/* Left: contact info */}
          <div className="flex-1 md:pr-12 md:border-r border-white/5">
            <h1 className="font-space text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Get in <span className="text-[#6134C1]">touch</span>
            </h1>
            <p className="text-xl text-gray-400 mb-16 max-w-lg leading-relaxed">
              Have a question or want to discuss a project? Drop us a line. We
              generally respond within 24 hours.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#6134C1]/50 group-hover:bg-[#6134C1]/10 transition-colors">
                  <Mail className="w-6 h-6 text-[#6134C1]" />
                </div>
                <div>
                  <h4 className="font-space text-lg font-bold mb-1 text-white">
                    Email
                  </h4>
                  <a
                    href="mailto:hello@liorlabs.com"
                    className="text-gray-400 hover:text-white transition-colors text-lg"
                  >
                    hello@liorlabs.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#6134C1]/50 group-hover:bg-[#6134C1]/10 transition-colors">
                  <Phone className="w-6 h-6 text-[#6134C1]" />
                </div>
                <div>
                  <h4 className="font-space text-lg font-bold mb-1 text-white">
                    Phone
                  </h4>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-400 hover:text-white transition-colors text-lg"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#6134C1]/50 group-hover:bg-[#6134C1]/10 transition-colors">
                  <MapPin className="w-6 h-6 text-[#6134C1]" />
                </div>
                <div>
                  <h4 className="font-space text-lg font-bold mb-1 text-white">
                    Office
                  </h4>
                  <p className="text-gray-400 text-lg">
                    123 Innovation Drive
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="flex-1 max-w-lg mt-12 md:mt-0 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#6134C1]/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <form
              className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
                e.currentTarget.reset();
              }}
            >
              <h3 className="font-space text-3xl font-bold mb-8">
                Send a message
              </h3>

              <div className="space-y-6">
                {isSubmitted ? (
                  <p className="rounded-2xl border border-[#6134C1]/30 bg-[#6134C1]/10 px-4 py-3 text-sm text-purple-100">
                    Thanks. Your message is ready for follow-up and we&apos;ll respond within 24 hours.
                  </p>
                ) : null}

                <label className="block">
                  <span className="sr-only">Your Name</span>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    autoComplete="name"
                    className="w-full bg-[#111111] border-b border-white/10 px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#6134C1] transition-all"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Email Address</span>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="w-full bg-[#111111] border-b border-white/10 px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#6134C1] transition-all"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">How can we help?</span>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={4}
                    placeholder="How can we help?"
                    required
                    autoComplete="off"
                    className="w-full bg-[#111111] border-b border-white/10 px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#6134C1] transition-all resize-none"
                  />
                </label>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-5 mt-4"
                >
                  Send Message <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
