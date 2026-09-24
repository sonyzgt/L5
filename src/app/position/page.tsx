import { PositionViewer } from "@/components/Position/PositionViewer";

export const metadata = {
  title: "Position • Aegis",
  description: "View and manage your active staking positions on Robinhood Chain.",
};

export default function PositionPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-8 bg-[#08090c] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <PositionViewer />
      </div>
    </div>
  );
}
