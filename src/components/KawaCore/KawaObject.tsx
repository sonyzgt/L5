"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { KawaCoreState } from "@/lib/blockchain/config";

interface KawaObjectProps {
  state: KawaCoreState;
}

export const KawaObject: React.FC<KawaObjectProps> = ({ state }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Configuration parameters based on state
  const stateConfig = useMemo(() => {
    switch (state) {
      case "dormant":
        return {
          coreSpeed: 0.15,
          ringSpeed: 0.25,
          colorCore: new THREE.Color("#52525b"),
          colorRing: new THREE.Color("#3f3f46"),
          colorParticles: new THREE.Color("#27272a"),
          intensity: 0.35,
          particleSpread: 1.8,
          scale: 0.85,
        };
      case "activated":
        return {
          coreSpeed: 0.35,
          ringSpeed: 0.5,
          colorCore: new THREE.Color("#93c5fd"),
          colorRing: new THREE.Color("#60a5fa"),
          colorParticles: new THREE.Color("#3b82f6"),
          intensity: 0.7,
          particleSpread: 2.2,
          scale: 0.95,
        };
      case "growing":
        return {
          coreSpeed: 0.6,
          ringSpeed: 0.9,
          colorCore: new THREE.Color("#6ee7b7"),
          colorRing: new THREE.Color("#34d399"),
          colorParticles: new THREE.Color("#059669"),
          intensity: 1.1,
          particleSpread: 2.6,
          scale: 1.05,
        };
      case "mature":
        return {
          coreSpeed: 0.9,
          ringSpeed: 1.3,
          colorCore: new THREE.Color("#c084fc"),
          colorRing: new THREE.Color("#a855f7"),
          colorParticles: new THREE.Color("#818cf8"),
          intensity: 1.5,
          particleSpread: 3.0,
          scale: 1.15,
        };
      case "awakened":
      default:
        return {
          coreSpeed: 1.3,
          ringSpeed: 1.8,
          colorCore: new THREE.Color("#f0fdf4"),
          colorRing: new THREE.Color("#38bdf8"),
          colorParticles: new THREE.Color("#e0e7ff"),
          intensity: 2.0,
          particleSpread: 3.5,
          scale: 1.25,
        };
    }
  }, [state]);

  // Generate particle coordinates
  const [particlePositions] = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const distance = THREE.MathUtils.randFloat(1.2, 3.2);

      positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = distance * Math.cos(phi);
    }
    return [positions];
  }, []);

  // Frame animation loop
  useFrame((stateCtx, delta) => {
    const time = stateCtx.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * stateConfig.coreSpeed * 0.4;
      coreRef.current.rotation.y += delta * stateConfig.coreSpeed * 0.7;
      // Gentle rhythmic breath
      const pulse = 1 + Math.sin(time * 1.5) * 0.04;
      coreRef.current.scale.set(
        stateConfig.scale * pulse,
        stateConfig.scale * pulse,
        stateConfig.scale * pulse
      );
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * stateConfig.ringSpeed * 0.35;
      outerRingRef.current.rotation.y = time * stateConfig.ringSpeed * 0.5;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -time * stateConfig.ringSpeed * 0.45;
      innerRingRef.current.rotation.z = time * stateConfig.ringSpeed * 0.3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
      particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group>
      {/* Central Singularity Core (Icosahedron wireframe + translucent inner solid) */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={stateConfig.colorCore}
          wireframe
          roughness={0.2}
          metalness={0.8}
          emissive={stateConfig.colorCore}
          emissiveIntensity={stateConfig.intensity * 0.5}
        />
      </mesh>

      {/* Inner Technological Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.65, 0.025, 16, 64]} />
        <meshBasicMaterial
          color={stateConfig.colorRing}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer Gyroscopic Flow Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.2, 0.015, 16, 80]} />
        <meshStandardMaterial
          color={stateConfig.colorRing}
          emissive={stateConfig.colorRing}
          emissiveIntensity={stateConfig.intensity * 0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Flowing Value Particles */}
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
          color={stateConfig.colorParticles}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.4} />
      <pointLight
        position={[4, 5, 4]}
        intensity={stateConfig.intensity * 1.5}
        color={stateConfig.colorCore}
      />
      <pointLight
        position={[-4, -3, -4]}
        intensity={0.5}
        color={stateConfig.colorRing}
      />
    </group>
  );
};
