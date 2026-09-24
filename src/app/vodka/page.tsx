import { VodkaAdminPanel } from "@/components/Admin/VodkaAdminPanel";

export const metadata = {
  title: "Admin • /vodka • Aegis",
  description: "Administrative console for Aegis Protocol pool assets on Robinhood Chain.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VodkaAdminPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-transparent text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <VodkaAdminPanel />
      </div>
    </div>
  );
}
