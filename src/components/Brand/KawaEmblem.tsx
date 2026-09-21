"use client";

import React from "react";
import { KawaCoreState } from "@/lib/blockchain/config";

interface KawaEmblemProps {
  size?: number | string;
  className?: string;
  state?: KawaCoreState;
  animate?: boolean;
  variant?: "black" | "white";
}

export const KawaEmblem: React.FC<KawaEmblemProps> = ({
  size = 64,
  className = "",
  state = "dormant",
  animate = false,
  variant = "white",
}) => {
  const src = variant === "black" ? "/kawa-logo-black-trimmed.png" : "/kawa-logo-white-trimmed.png";

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`w-full h-full relative flex items-center justify-center ${
          animate ? "animate-[pulse_4s_ease-in-out_infinite]" : ""
        }`}
      >
        <img
          src={src}
          alt="KAWA Logo"
          className="w-full h-full object-contain pointer-events-none transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};
