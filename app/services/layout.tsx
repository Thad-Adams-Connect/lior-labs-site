import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lior Labs - Services",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
