import { StakingDashboard } from "@/components/Staking/StakingDashboard";

export const metadata = {
  title: "Stake • KAWA",
  description: "Stake tokens and earn continuous yield on Robinhood Chain.",
};

export default function StakePage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-[#090a0c] text-white overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <StakingDashboard />
      </div>
    </div>
  );
}
