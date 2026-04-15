import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Lior Labs",
  description:
    "We build high-performance websites and applications. Fast, reliable, and beautifully designed digital experiences that drive results.",
  applicationName: "Lior Labs",
  manifest: "/manifest.webmanifest?v=20260415",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.png?v=20260415", sizes: "32x32", type: "image/png" }],
    shortcut: ["/favicon.png?v=20260415"],
    apple: [
      {
        url: "/apple-touch-icon.png?v=20260415",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Lior Labs",
    statusBarStyle: "black-translucent",
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-inter min-dvh bg-[#050505] text-white flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
