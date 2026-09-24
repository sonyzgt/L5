"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidEntityProps {
  scrollProgress?: number;
}

const LiquidFlowEntity: React.FC<LiquidEntityProps> = ({ scrollProgress = 0 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Mouse tracking with smooth lerp
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Generate stream particles
  const [particlePositions] = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * Math.PI;
      const radius = 2.2 + Math.random() * 0.9;
      pos[i * 3] = radius * Math.cos(v) * Math.cos(u);
      pos[i * 3 + 1] = radius * Math.sin(v);
      pos[i * 3 + 2] = radius * Math.cos(v) * Math.sin(u);
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Lerp mouse
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

    if (meshRef.current) {
      // Slow organic rotation + mouse tilt + scroll spin
      meshRef.current.rotation.x = t * 0.12 + mouse.current.y * 0.25 + scrollProgress * 1.5;
      meshRef.current.rotation.y = t * 0.18 + mouse.current.x * 0.35 + scrollProgress * 2.2;
      meshRef.current.rotation.z = t * 0.08;

      // Subtle breathing scale
      const breath = 1 + Math.sin(t * 0.8) * 0.035;
      const scrollScale = 1 + scrollProgress * 0.35;
      meshRef.current.scale.set(breath * scrollScale, breath * scrollScale, breath * scrollScale);
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -t * 0.22 - scrollProgress * 1.8;
      innerRingRef.current.rotation.y = -t * 0.15;
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.z = t * 0.09;
      outerWireRef.current.rotation.y = t * 0.06;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05 + scrollProgress * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Flowing Liquid Obsidian Entity */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.35, 0.42, 160, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#141f11"
          roughness={0.16}
          metalness={0.88}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          transmission={0.22}
          ior={1.55}
          reflectivity={0.9}
        />
      </mesh>

      {/* Counter-Rotating Kinetic Inner Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.9, 0.02, 16, 100]} />
        <meshBasicMaterial color="#B8F34A" opacity={0.65} transparent />
      </mesh>

      {/* Outer Thin Technical Orbit Ring */}
      <mesh ref={outerWireRef}>
        <torusGeometry args={[2.55, 0.012, 16, 120]} />
        <meshBasicMaterial color="#F4F1E8" opacity={0.22} transparent wireframe />
      </mesh>

      {/* Orbiting Yield Stream Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#B8F34A"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Volumetric Light Sources */}
      {/* Luminous Moss Lime Key Edge Light */}
      <pointLight position={[3.5, 3.0, 2.5]} intensity={9.0} color="#B8F34A" distance={10} />
      {/* Deep Forest Moss Fill Light (#283615) */}
      <pointLight position={[-3.5, -2.5, -2.0]} intensity={5.0} color="#283615" distance={10} />
      {/* Warm Ivory Rim Reflection */}
      <pointLight position={[0, -3.5, 3.5]} intensity={4.0} color="#F4F1E8" distance={8} />
      <ambientLight intensity={0.5} />
    </group>
  );
};

// Graceful CSS Fallback for low-power devices / disabled WebGL
const HeroVisualFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <div className="relative w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full border border-white/[0.08] flex items-center justify-center animate-[spin_40s_linear_infinite]">
        <div className="w-[75%] h-[75%] rounded-full border border-dashed border-[#C7FF28]/30 flex items-center justify-center animate-[spin_25s_linear_infinite_reverse]">
          <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#C7FF28]/20 via-[#0a120c] to-transparent border border-white/10 shadow-[0_0_80px_rgba(199,255,40,0.15)]" />
        </div>
      </div>
    </div>
  );
};

export interface HeroVisual3DProps {
  className?: string;
  scrollProgress?: number;
}

export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({
  className = "w-full h-full",
  scrollProgress = 0,
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === false) {
    return <HeroVisualFallback />;
  }

  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      <Suspense fallback={<HeroVisualFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full"
        >
          <LiquidFlowEntity scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  );
};
