import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navigation/Navbar";
import { Footer } from "@/components/Navigation/Footer";
import { Auralis } from "@/components/ui/auralis";

export const metadata: Metadata = {
  metadataBase: new URL("https://layer5.network"),
  title: "Layer5 — Staking on Robinhood Chain",
  description: "Layer5 is a staking protocol built on Robinhood Chain. Stake, flow, grow, and earn.",
  keywords: ["Layer5", "Robinhood Chain", "Staking", "DeFi", "Web3", "Ethereum", "EVM"],
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
    title: "Layer5 — Staking on Robinhood Chain",
    description: "Layer5 is a staking protocol built on Robinhood Chain. Stake, flow, grow, and earn.",
    url: "https://layerfive.io",
    siteName: "Layer5 Protocol",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Layer5 Protocol — Robinhood Chain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layer5 — Staking on Robinhood Chain",
    description: "Layer5 is a staking protocol built on Robinhood Chain. Stake, flow, grow, and earn.",
    creator: "@layer5dotio",
    site: "@layer5dotio",
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
      <body className="bg-[#08090c] text-[#f4f5f8] antialiased selection:bg-[#c8f53c] selection:text-[#08090c] min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Subtle Sterling Gate Ambient Background Glows & Auralis WebGL */}
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#c8f53c]/[0.035] blur-[160px] rounded-full" />
          <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[600px] bg-indigo-600/[0.03] blur-[180px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#08090c_85%)]" />
          <div className="absolute inset-0 opacity-40">
            <Auralis
              colors={["#c8f53c", "#22c55e", "#10b981"]}
              speed={0.2}
              grain={0.35}
              className="w-full h-full bg-transparent"
            />
          </div>
        </div>

        <Providers>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
