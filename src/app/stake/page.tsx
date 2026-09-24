import { StakingDashboard } from "@/components/Staking/StakingDashboard";

export const metadata = {
  title: "Stake USDG — Aegis",
  description:
    "Stake USDG to continuously stream Aegis reward tokens on Robinhood Chain with zero lockup epochs and instant withdrawals.",
};

export default function StakePage() {
  return (
    <div className="relative min-h-screen pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#F6F3EC] text-[#1C1B18]">
      <main className="relative z-10 w-full max-w-7xl mx-auto">
        <StakingDashboard />
      </main>
    </div>
  );
}
