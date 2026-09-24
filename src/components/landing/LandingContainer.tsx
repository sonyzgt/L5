"use client";

import React, { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { IntroLoader } from "./IntroLoader";
import { HeroSection } from "./HeroSection";
import { MarqueeTicker } from "./MarqueeTicker";
import { ProtocolStorySection } from "./ProtocolStorySection";
import { HowItWorksSection } from "./HowItWorksSection";
import { LiveMetricsSection } from "./LiveMetricsSection";
import { ProtocolFaqSection } from "./ProtocolFaqSection";
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
      className="relative min-h-screen w-full bg-[#F6F3EC] text-[#1C1B18] overflow-x-hidden selection:bg-[#1C1B18] selection:text-[#F6F3EC]"
    >
      {/* Intro sequence */}
      <IntroLoader />

      {/* Hero Section */}
      <HeroSection
        scrollProgress={scrollYProgress}
        smoothProgress={smoothProgress}
        calculatedApy={calculatedApy}
      />

      {/* Marquee Streaming Ribbon (Inspired by royalty.global) */}
      <MarqueeTicker />

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

      {/* Reverse Marquee Ribbon */}
      <MarqueeTicker reverse />

      {/* Section 5: Protocol Intelligence FAQ Accordion */}
      <ProtocolFaqSection />

      {/* Section 6 & Footer: Final invitation to stake */}
      <FinalCTASection />
    </div>
  );
};

export default LandingContainer;
