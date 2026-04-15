import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lior Labs - Contact",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
