"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (!isMenuOpen) return;

    // iOS Safari ignores overflow:hidden on <body> for preventing touch scroll.
    // position:fixed is the reliable cross-browser scroll lock.
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore exact scroll position without a visible jump.
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`safe-x safe-top fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "h-20 bg-black/80 glass-surface backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20"
            : "h-20 md:h-24 bg-transparent border-b-transparent"
        }`}
      >
        <Link href="/" className="group flex h-full items-center" aria-label="Lior Labs home">
          <Image
            src="/lior-labs-1-line-logo.png"
            alt="Lior Labs"
            width={896}
            height={230}
            priority
            className="h-10 w-auto self-center group-hover:opacity-90 transition-opacity"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 bg-white/5 glass-panel px-6 py-2 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
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

        <button
          type="button"
          className="md:hidden text-white rounded-full border border-white/10 bg-white/5 p-3"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
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
            {isMenuOpen ? (
              <>
                <line x1="6" x2="18" y1="6" y2="18" />
                <line x1="6" x2="18" y1="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </>
            )}
          </svg>
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 md:hidden"
              aria-label="Close menu overlay"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-6 right-6 top-[calc(env(safe-area-inset-top)+5.5rem)] z-50 md:hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a]/95 glass-panel backdrop-blur-xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black/40"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/quote"
                className="mt-6 flex items-center justify-center rounded-full bg-[#6134C1] px-6 py-3 text-white font-medium transition-colors hover:bg-[#7245d2]"
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
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
