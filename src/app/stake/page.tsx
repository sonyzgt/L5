import { StakingDashboard } from "@/components/Staking/StakingDashboard";

export const metadata = {
  title: "Stake • Aegis",
  description: "Stake tokens and earn continuous yield on Robinhood Chain.",
};

export default function StakePage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-8 bg-[#F6F3EC] text-[#1C1B18] overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <StakingDashboard />
      </div>
    </div>
  );
}
