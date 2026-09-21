import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navigation/Navbar";
import { Footer } from "@/components/Navigation/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kawa.network"),
  title: "KAWA — Staking on Robinhood Chain",
  description: "KAWA is a staking protocol built on Robinhood Chain. Stake, flow, grow, and earn.",
  keywords: ["KAWA", "Robinhood Chain", "Staking", "DeFi", "Web3", "Ethereum", "EVM"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "KAWA — Staking on Robinhood Chain",
    description: "KAWA is a staking protocol built on Robinhood Chain. Stake, flow, grow, and earn.",
    url: "https://kawa.network",
    siteName: "KAWA Protocol",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KAWA Protocol — Robinhood Chain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAWA — Staking on Robinhood Chain",
    description: "KAWA is a staking protocol built on Robinhood Chain. Stake, flow, grow, and earn.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-[#090a0c] text-[#f3f4f6] antialiased selection:bg-[#c8f53c] selection:text-[#090a0c] min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
