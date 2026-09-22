import { StatsViewer } from "@/components/Stats/StatsViewer";
import { Scene06LiveActivity } from "@/components/Scene/Scene06LiveActivity";

export const metadata = {
  title: "Stats • Layer5",
  description: "Audited protocol metrics and parameters for Layer5 on Robinhood Chain.",
};

export default function StatsPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-8 bg-[#08090c] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-16">
        <StatsViewer />
        <Scene06LiveActivity />
      </div>
    </div>
  );
}
