import { StatsViewer } from "@/components/Stats/StatsViewer";

export const metadata = {
  title: "Stats • KAWA",
  description: "Audited protocol metrics and parameters for KAWA on Robinhood Chain.",
};

export default function StatsPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-[#090a0c] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <StatsViewer />
      </div>
    </div>
  );
}
