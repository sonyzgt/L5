import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs • Aegis",
  description: "Official Aegis Protocol documentation and technical reference on Robinhood Chain.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
