"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { KawaWatermark } from "../Brand/KawaWatermark";
import { Scene01Awakening } from "./Scene01Awakening";
import { Scene02TheFlow } from "./Scene02TheFlow";
import { Scene03TheProtocol } from "./Scene03TheProtocol";
import { Scene04TheKawa } from "./Scene04TheKawa";
import { Scene05TheEnd } from "./Scene05TheEnd";

export const SceneContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [activeSceneIndex, setActiveSceneIndex] = useState(1);

  // Calculate current scene number based on scroll position (5 scenes total)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;

      const flowEl = document.getElementById("the-flow");
      const protocolEl = document.getElementById("the-protocol");
      const kawaEl = document.getElementById("your-kawa");
      const endEl = document.getElementById("the-end");

      if (endEl && scrollPos >= endEl.offsetTop - windowHeight / 2) {
        setActiveSceneIndex(5);
      } else if (kawaEl && scrollPos >= kawaEl.offsetTop - windowHeight / 2) {
        setActiveSceneIndex(4);
      } else if (protocolEl && scrollPos >= protocolEl.offsetTop - windowHeight / 2) {
        setActiveSceneIndex(3);
      } else if (flowEl && scrollPos >= flowEl.offsetTop - windowHeight / 3) {
        setActiveSceneIndex(2);
      } else {
        setActiveSceneIndex(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#090a0c] text-white font-sans selection:bg-[#c8f53c] selection:text-black"
    >
      {/* Scroll-Driven Architectural Watermark in Fixed Background */}
      <KawaWatermark />

      {/* Discrete Quiet Scroll Progress Indicator (Right Edge) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 select-none pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-[#c8f53c] font-medium">
          0{activeSceneIndex}
        </span>
        <div className="w-[1.5px] h-20 bg-neutral-800 relative overflow-hidden rounded-full">
          <motion.div
            style={{ scaleY }}
            className="absolute inset-0 bg-[#c8f53c] origin-top rounded-full shadow-[0_0_6px_#c8f53c]"
          />
        </div>
        <span className="text-[9px] font-mono tracking-widest text-neutral-500">
          05
        </span>
      </div>

      {/* Continuous Scroll Cinematic Sequence — Zero Click Targets */}
      <div className="relative z-10 w-full">
        {/* Scene 01: The Awakening */}
        <Scene01Awakening />

        {/* Scene 02: The Flow (Pinned Sticky Scroll Sequence: STAKE -> FLOW -> GROW -> REWARD) */}
        <Scene02TheFlow />

        {/* Scene 03: The Protocol (Architecture & Tenets) */}
        <Scene03TheProtocol />

        {/* Scene 04: Your KAWA (The Living State & Progression) */}
        <Scene04TheKawa />

        {/* Scene 05: The End (Minimal Epilogue) */}
        <Scene05TheEnd />
      </div>
    </div>
  );
};
