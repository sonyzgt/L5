"use client";

import React from "react";
import { KawaCoreState } from "@/lib/blockchain/config";

interface KawaFallbackProps {
  state?: KawaCoreState;
  className?: string;
}

export const KawaFallback: React.FC<KawaFallbackProps> = ({
  state = "dormant",
  className = "w-full h-full",
}) => {
  const getGlowColor = () => {
    switch (state) {
      case "activated":
        return "rgba(96, 165, 250, 0.25)";
      case "growing":
        return "rgba(110, 231, 183, 0.25)";
      case "mature":
        return "rgba(192, 132, 252, 0.3)";
      case "awakened":
        return "rgba(56, 189, 248, 0.4)";
      case "dormant":
      default:
        return "rgba(113, 113, 122, 0.15)";
    }
  };

  const getBorderColor = () => {
    switch (state) {
      case "activated":
        return "border-blue-400/40";
      case "growing":
        return "border-emerald-400/50";
      case "mature":
        return "border-purple-400/50";
      case "awakened":
        return "border-sky-300/70";
      case "dormant":
      default:
        return "border-zinc-700/40";
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Soft Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl transition-all duration-1000"
          style={{ background: getGlowColor() }}
        />

        {/* Outer Ring */}
        <div
          className={`absolute w-56 h-56 rounded-full border border-dashed ${getBorderColor()} animate-[spin_40s_linear_infinite] opacity-60`}
        />

        {/* Intermediate Gyroscopic Ring */}
        <div
          className={`absolute w-44 h-44 rounded-full border ${getBorderColor()} animate-[spin_25s_linear_infinite_reverse] opacity-80`}
          style={{ transform: "rotateX(60deg) rotateY(25deg)" }}
        />

        {/* Central Geometric Core */}
        <div
          className={`relative w-24 h-24 border ${getBorderColor()} rotate-45 flex items-center justify-center transition-all duration-700`}
        >
          <div className="w-12 h-12 bg-white/5 border border-white/20 rotate-45 backdrop-blur-sm" />
          <div
            className="absolute w-3 h-3 rounded-full transition-all duration-700"
            style={{
              boxShadow: `0 0 15px 4px ${getGlowColor()}`,
              backgroundColor: state === "dormant" ? "#71717a" : "#ffffff",
            }}
          />
        </div>
      </div>
    </div>
  );
};
