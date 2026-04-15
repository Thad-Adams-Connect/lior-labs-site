import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lior Labs - Case Studies",
};

export default function CaseStudiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
