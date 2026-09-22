import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation"

export default function LiquidDemoPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#fafafa]">
      <LiquidEffectAnimation
        text={["Liquid", "Effect"]}
        subText="Interactive Three.js Distortion"
        tagline="Aesthetic WebGL Liquid Effect from 21st.dev"
        backgroundColor="#fafafa"
        textColor="#1d1d1f"
      />
    </main>
  )
}
