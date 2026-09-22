"use client";

import React from "react";
import { Layer5CoreState } from "@/lib/blockchain/config";

export interface Layer5EmblemProps {
  size?: number | string;
  className?: string;
  state?: Layer5CoreState;
  animate?: boolean;
  variant?: "black" | "white";
}

export type KawaEmblemProps = Layer5EmblemProps;

export const Layer5Emblem: React.FC<Layer5EmblemProps> = ({
  size = 64,
  className = "",
  state = "dormant",
  animate = false,
  variant = "white",
}) => {
  const src = variant === "black" ? "/layer5-logo-black-trimmed.png" : "/layer5-logo-white-trimmed.png";

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
          alt="Layer5 Logo"
          className="w-full h-full object-contain pointer-events-none transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
};

export const KawaEmblem = Layer5Emblem;
