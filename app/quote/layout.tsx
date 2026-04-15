import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lior Labs - Quote",
};

export default function QuoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
