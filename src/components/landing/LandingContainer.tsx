"use client";

import React, { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { IntroLoader } from "./IntroLoader";
import { HeroSection } from "./HeroSection";
import { ProtocolStorySection } from "./ProtocolStorySection";
import { HowItWorksSection } from "./HowItWorksSection";
import { LiveMetricsSection } from "./LiveMetricsSection";
import { FinalCTASection } from "./FinalCTASection";
import { useLayer5Staking } from "@/lib/hooks/useLayer5Staking";

export const LandingContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Pull real-time on-chain data for live telemetry
  const { totalStaked, calculatedApy, totalStakers, stakeDecimals } = useLayer5Staking();

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050706] text-[#F5F7F2] overflow-x-hidden selection:bg-[#C7FF28] selection:text-[#050706]"
    >
      {/* Intro sequence */}
      <IntroLoader />

      {/* Top Hero Section with 3D liquid entity & massive typography */}
      <HeroSection
        scrollProgress={scrollYProgress}
        smoothProgress={smoothProgress}
        calculatedApy={calculatedApy}
      />

      {/* Section 2: Architectural Story with scroll-driven illuminating words */}
      <ProtocolStorySection />

      {/* Section 3: Editorial 3-phase execution timeline */}
      <HowItWorksSection />

      {/* Section 4: Verifiable On-chain Telemetry */}
      <LiveMetricsSection
        totalStaked={totalStaked}
        calculatedApy={calculatedApy}
        totalStakers={totalStakers}
        stakeDecimals={stakeDecimals}
      />

      {/* Section 5 & Footer: Final invitation to stake */}
      <FinalCTASection />
    </div>
  );
};
