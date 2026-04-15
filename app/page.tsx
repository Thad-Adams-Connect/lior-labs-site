"use client";

import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { ArrowRight, Code2, Layers, Smartphone } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const abstractGlow =
  "https://images.unsplash.com/photo-1685871286419-58e4fc0de8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjBnbG93aW5nJTIwc2hhcGVzfGVufDF8fHx8MTc3NTc1OTA0OXww&ixlib=rb-4.1.0&q=80&w=1080";
const dashApp =
  "https://images.unsplash.com/photo-1720135885007-454165745e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZXJuJTIwZGFzaGJvYXJkJTIwYXBwfGVufDF8fHx8MTc3NTc1OTA0OXww&ixlib=rb-4.1.0&q=80&w=1080";
const codeEditor =
  "https://images.unsplash.com/photo-1773349807434-374473797148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwZGFyayUyMG1vZGV8ZW58MXx8fHwxNzc1NzU5MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesPreview />
      <CaseStudiesPreview />
      <CTASection />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-shell min-dvh relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: static smaller glow — large animated blurs crash iOS Safari's GPU */}
        <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#6134C1]/25 blur-[60px] rounded-full" />
        {/* Desktop: animated glow */}
        <motion.div
          className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#6134C1]/30 blur-[120px] rounded-[100%]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none mix-blend-overlay">
          <h1
            className="font-space text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap"
          >
            LIOR LABS
          </h1>
        </div>
      </div>

      <div className="safe-x relative z-10 container mx-auto text-center mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="font-space text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1]">
            High-performance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#6134C1]">
              websites
            </span>{" "}
            and applications.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We build digital experiences that drive results. Fast, reliable, and
            beautifully designed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              to="/quote"
              variant="primary"
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              Get a Quote <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              to="/case-studies"
              variant="secondary"
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              View Work
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating element */}
      <motion.div
        className="absolute bottom-20 right-[15%] w-64 h-64 border border-white/5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md hidden lg:block"
        animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ImageWithFallback
          src={abstractGlow}
          alt="Abstract"
          className="w-full h-full object-cover rounded-2xl opacity-50 mix-blend-screen"
        />
      </motion.div>
    </section>
  );
}

function ServicesPreview() {
  const services = [
    {
      title: "Starter",
      description:
        "Basic websites with fast delivery. Perfect for new ventures.",
      icon: <Layers className="w-6 h-6 text-[#6134C1]" />,
    },
    {
      title: "Pro",
      description:
        "Custom UI/UX and integrations. Tailored for growing businesses.",
      icon: <Code2 className="w-6 h-6 text-[#6134C1]" />,
    },
    {
      title: "Web App",
      description:
        "Full-stack apps, APIs, dashboards. Complex solutions made simple.",
      icon: <Smartphone className="w-6 h-6 text-[#6134C1]" />,
    },
  ];

  return (
    <section className="safe-x py-24 md:py-32 relative bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-[#6134C1] tracking-widest uppercase mb-3 flex items-center gap-4">
              <span className="w-8 h-px bg-[#6134C1]" /> Our Services
            </h2>
            <h3 className="font-space text-4xl md:text-5xl font-bold tracking-tight">
              Tailored Solutions
            </h3>
          </div>
          <Button to="/services" variant="outline">
            View All Details
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#0f0f13] rounded-3xl p-8 border border-white/5 hover:border-[#6134C1]/50 transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#6134C1]/0 to-[#6134C1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-px rounded-3xl border border-[#6134C1]/0 group-hover:border-[#6134C1]/30 group-hover:shadow-[0_0_30px_rgba(97,52,193,0.15)] transition-all duration-500 z-0" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#6134C1]/10 flex items-center justify-center mb-8 border border-[#6134C1]/20">
                  {service.icon}
                </div>
                <h4 className="font-space text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesPreview() {
  const projects = [
    {
      title: "Fintech Dashboard",
      desc: "Modern React interface for financial data analytics.",
      img: dashApp,
    },
    {
      title: "Developer Portal",
      desc: "Dark mode API documentation and testing sandbox.",
      img: codeEditor,
    },
  ];

  return (
    <section className="safe-x py-24 md:py-32 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold text-[#6134C1] tracking-widest uppercase mb-3 flex items-center gap-4">
              <span className="w-8 h-px bg-[#6134C1]" /> Selected Work
            </h2>
            <h3 className="font-space text-4xl md:text-5xl font-bold tracking-tight">
              Featured Projects
            </h3>
          </div>
          <Button to="/case-studies" variant="outline">
            Explore Portfolio
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.7 }}
              className="group cursor-pointer rounded-3xl overflow-hidden relative border border-white/5 bg-[#0a0a0a]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="h-1 w-12 bg-[#6134C1] rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                <h4 className="font-space text-3xl font-bold mb-2">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="safe-x safe-bottom py-24 md:py-32 relative overflow-hidden border-t border-white/5 bg-[#050505]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[280px] h-[280px] md:w-[500px] md:h-[500px] bg-[#6134C1]/20 blur-[60px] md:blur-[100px] rounded-full" />
      </div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-[#6134C1]/10"
        >
          <h2 className="font-space text-4xl md:text-6xl font-bold mb-6">
            Ready to start?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Let&apos;s build something extraordinary together. Fast execution,
            premium quality.
          </p>
          <Button to="/quote" variant="primary" className="text-lg px-10 py-5">
            Start a Project <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
