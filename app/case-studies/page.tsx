"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudiesPage() {
  const dashApp =
    "https://images.unsplash.com/photo-1720135885007-454165745e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZXJuJTIwZGFzaGJvYXJkJTIwYXBwfGVufDF8fHx8MTc3NTc1OTA0OXww&ixlib=rb-4.1.0&q=80&w=1080";
  const codeEditor =
    "https://images.unsplash.com/photo-1773349807434-374473797148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwZGFyayUyMG1vZGV8ZW58MXx8fHwxNzc1NzU5MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080";
  const abstractGlow =
    "https://images.unsplash.com/photo-1685871286419-58e4fc0de8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjBnbG93aW5nJTIwc2hhcGVzfGVufDF8fHx8MTc3NTc1OTA0OXww&ixlib=rb-4.1.0&q=80&w=1080";

  const projects = [
    {
      title: "Fintech Dashboard",
      category: "Web Application",
      img: dashApp,
      cols: "col-span-1 md:col-span-2",
    },
    {
      title: "Developer Sandbox",
      category: "UI/UX Design",
      img: codeEditor,
      cols: "col-span-1",
    },
    {
      title: "Quantum API Docs",
      category: "Web Platform",
      img: abstractGlow,
      cols: "col-span-1",
    },
    {
      title: "Neo E-Commerce",
      category: "Web Application",
      img: dashApp,
      cols: "col-span-1 md:col-span-2",
    },
  ];

  return (
    <div className="page-shell safe-x min-dvh">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-white/5 pb-12"
        >
          <div>
            <h1 className="font-space text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Selected <span className="text-[#6134C1]">Work</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl">
              A collection of our recent projects. High-performance,
              pixel-perfect interfaces designed for impact.
            </p>
          </div>
          <div className="flex gap-4 opacity-50">
            <span className="text-sm font-medium tracking-widest uppercase">All</span>
            <span className="text-sm font-medium tracking-widest uppercase">/</span>
            <span className="text-sm font-medium tracking-widest uppercase">Apps</span>
            <span className="text-sm font-medium tracking-widest uppercase">/</span>
            <span className="text-sm font-medium tracking-widest uppercase">Sites</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer border border-white/5 bg-[#0a0a0a] ${project.cols}`}
            >
              <div className="aspect-[4/3] md:aspect-auto md:h-[500px] overflow-hidden w-full">
                <ImageWithFallback
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#050505]/60 group-hover:bg-[#050505]/20 transition-colors duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
              </div>

              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 hover:bg-[#6134C1]">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-px w-8 bg-[#6134C1] hidden group-hover:block" />
                  <p className="text-sm font-medium text-[#6134C1] uppercase tracking-wider">
                    {project.category}
                  </p>
                </div>
                <h3 className="font-space text-4xl font-bold group-hover:text-white text-gray-200 transition-colors duration-500">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
