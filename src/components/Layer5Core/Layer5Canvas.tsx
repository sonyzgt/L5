"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Layer5Object } from "./Layer5Object";
import { Layer5Fallback } from "./Layer5Fallback";
import { Layer5CoreState } from "@/lib/blockchain/config";

export interface Layer5CanvasProps {
  state?: Layer5CoreState;
  className?: string;
  interactive?: boolean;
}

export type KawaCanvasProps = Layer5CanvasProps;

export const Layer5Canvas: React.FC<Layer5CanvasProps> = ({
  state = "dormant",
  className = "w-full h-full",
  interactive = false,
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (hasWebGL === false || reducedMotion) {
    return <Layer5Fallback state={state} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      <Suspense fallback={<Layer5Fallback state={state} className="w-full h-full" />}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <Layer5Object state={state} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export const KawaCanvas = Layer5Canvas;

