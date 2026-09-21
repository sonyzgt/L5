import { PositionViewer } from "@/components/Position/PositionViewer";

export const metadata = {
  title: "Position • KAWA",
  description: "View and manage your active staking positions on Robinhood Chain.",
};

export default function PositionPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-[#090a0c] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <PositionViewer />
      </div>
    </div>
  );
}
