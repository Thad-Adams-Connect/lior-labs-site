import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lior Labs - Privacy Policy",
};

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
