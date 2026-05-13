"use client";

import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { Check, Cpu, Globe, Rocket } from "lucide-react";

export default function ServicesPage() {
  const plans = [
    {
      name: "Essential Tier",
      desc: "Basic Website + Contact Form.",
      price: "$550",
      icon: <Globe className="w-8 h-8 text-[#6134C1]" />,
      features: [
        "Basic Website",
        "Contact Form",
        "Responsive Design",
        "Basic SEO Setup",
        "Fast Delivery",
      ],
    },
    {
      name: "Prime Tier",
      desc: "Standard Website + CMS + Custom Design.",
      price: "$1,500",
      icon: <Rocket className="w-8 h-8 text-[#6134C1]" />,
      features: [
        "Standard Website",
        "CMS Integration",
        "Custom Design",
        "Content Editing Workflow",
        "Performance Optimization",
      ],
      featured: true,
    },
    {
      name: "Ultimate Tier",
      desc: "Custom web + mobile product tailored to your goals.",
      price: "Custom Pricing",
      icon: <Cpu className="w-8 h-8 text-[#6134C1]" />,
      features: [
        "Custom Product Strategy",
        "Custom Web App Build",
        "Custom Mobile App Build",
        "Custom API & Backend Architecture",
        "Custom Integrations & Deployment",
      ],
    },
  ];

  return (
    <div className="page-shell safe-x min-dvh">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <h1 className="font-space text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Our <span className="text-[#6134C1]">Services</span>
          </h1>
          <p className="text-xl text-gray-400">
            Tailored digital solutions to elevate your brand. We focus on
            performance, aesthetics, and scalable architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-[2.5rem] p-10 flex flex-col border backdrop-blur-sm ${
                plan.featured
                  ? "bg-[#6134C1]/10 border-[#6134C1]/30 shadow-[0_0_50px_rgba(97,52,193,0.1)]"
                  : "bg-[#0a0a0a] border-white/5"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#6134C1] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                {plan.icon}
              </div>

              <h3 className="font-space text-3xl font-bold mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-400 mb-8 h-12">{plan.desc}</p>

              <div className="font-space text-4xl font-bold tracking-tight mb-8">
                {plan.price}
              </div>

              <div className="space-y-4 flex-1 mb-10">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-[#6134C1] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                to="/quote"
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full mt-auto"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
