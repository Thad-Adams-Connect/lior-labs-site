import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="safe-x safe-bottom border-t border-white/10 py-12 mt-20 relative overflow-hidden">
      {/* Gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-[#6134C1] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="inline-block">
            <Image
              src="/lior-labs-1-line-logo.png"
              alt="Lior Labs"
              width={896}
              height={230}
              className="h-9 md:h-10 w-auto"
            />
          </Link>
          <p className="text-gray-400 text-sm">
            High-performance websites and applications. We build digital
            experiences that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium mb-2">Company</h4>
            <Link
              href="/services"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Services
            </Link>
            <Link
              href="/case-studies"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Case Studies
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-medium mb-2">Connect</h4>
            <a
              href="mailto:hello@liorlabs.com"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              hello@liorlabs.com
            </a>
            <a
              href="tel:+1234567890"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              +1 (234) 567-890
            </a>
            <Link
              href="/quote"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© 2026 Lior Labs. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            href="/privacy-policy"
            className="hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-gray-300 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
