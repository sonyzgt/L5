"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingPathsProps {
  position?: number;
  className?: string;
  color?: string;
  glowColor?: string;
  count?: number;
  opacityMultiplier?: number;
}

export const FloatingPaths: React.FC<FloatingPathsProps> = ({
  position = 1,
  className = "",
  color = "#c8f53c", // Brand electric cyber lime
  glowColor = "rgba(200, 245, 60, 0.4)",
  count = 36,
  opacityMultiplier = 1,
}) => {
  const filterId = useId();

  // Generate the curved streamlines using Bundui's mathematical spline formula
  const paths = React.useMemo(() => {
    return Array.from({ length: count }, (_, h) => {
      // Deterministic pseudo-random duration based on index so SSR and re-renders stay consistent
      const duration = 18 + ((h * 7) % 12);
      const delay = (h * 0.25) % 3;

      return {
        id: h,
        d: `M-${380 - h * 5 * position} -${189 + h * 6}C-${
          380 - h * 5 * position
        } -${189 + h * 6} -${312 - h * 5 * position} ${216 - h * 6} ${
          152 - h * 5 * position
        } ${343 - h * 6}C${616 - h * 5 * position} ${470 - h * 6} ${
          684 - h * 5 * position
        } ${875 - h * 6} ${684 - h * 5 * position} ${875 - h * 6}`,
        width: 0.6 + h * 0.035,
        strokeOpacity: Math.min(0.65, (0.08 + h * 0.018) * opacityMultiplier),
        duration,
        delay,
      };
    });
  }, [count, position, opacityMultiplier]);

  return (
    <div className={cn("w-full h-full relative overflow-hidden pointer-events-none select-none", className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={color}
            strokeWidth={path.width}
            strokeOpacity={path.strokeOpacity}
            strokeLinecap="round"
            filter={path.id % 4 === 0 ? `url(#${filterId})` : undefined}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.75, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export interface FloatingPathsBackgroundProps extends FloatingPathsProps {
  children?: React.ReactNode;
}

export const FloatingPathsBackground: React.FC<FloatingPathsBackgroundProps> = ({
  position = -1,
  className = "",
  color = "#c8f53c", // Styled to match KAWA Robinhood Chain theme
  glowColor,
  count = 36,
  opacityMultiplier = 1,
  children,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Background Floating Paths Layer */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <FloatingPaths
          position={position}
          color={color}
          glowColor={glowColor}
          count={count}
          opacityMultiplier={opacityMultiplier}
        />
      </div>

      {/* Foreground Content */}
      {children}
    </div>
  );
};

export default FloatingPathsBackground;
