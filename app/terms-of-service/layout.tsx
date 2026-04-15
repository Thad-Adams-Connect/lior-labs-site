import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lior Labs - Terms of Service",
};

export default function TermsOfServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
