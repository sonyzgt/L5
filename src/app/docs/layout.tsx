import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs • Layer5",
  description: "Official Layer5 Protocol documentation and technical reference on Robinhood Chain.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
