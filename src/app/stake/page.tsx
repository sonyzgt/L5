import { StakingDashboard } from "@/components/Staking/StakingDashboard";

export const metadata = {
  title: "Stake • Layer5",
  description: "Stake tokens and earn continuous yield on Robinhood Chain.",
};

export default function StakePage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-8 bg-[#08090c] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <StakingDashboard />
      </div>
    </div>
  );
}
