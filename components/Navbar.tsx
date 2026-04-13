"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20"
          : "py-6 bg-transparent border-b-transparent"
      }`}
    >
      <Link href="/" className="group">
        <Image
          src="/lior-labs-1-line-logo.png"
          alt="Lior Labs"
          width={896}
          height={230}
          priority
          className="h-10 w-auto group-hover:opacity-90 transition-opacity"
        />
      </Link>

      <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10">
        <NavLink href="/services">Services</NavLink>
        <NavLink href="/case-studies">Case Studies</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </div>

      <Link
        href="/quote"
        className="hidden md:flex items-center justify-center bg-[#6134C1] text-white px-6 py-2.5 rounded-full font-medium transition-all hover:bg-[#7245d2] hover:shadow-[0_0_20px_rgba(97,52,193,0.4)]"
      >
        Get a Quote
        <motion.span
          className="ml-2 bg-white/20 rounded-full p-1"
          whileHover={{ x: 2, y: -2 }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.span>
      </Link>

      <button className="md:hidden text-white" aria-label="Open menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
    >
      {children}
    </Link>
  );
}
