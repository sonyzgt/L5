"use client"

import DemoOne from "@/components/ui/demo"
import { Button, LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button"

export default function LiquidButtonDemoPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-20 px-6 flex flex-col items-center justify-center text-center space-y-12 bg-[#F6F3EC] text-[#1C1B18]">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#1C1B18]">
          Liquid Glass & Metal Buttons
        </h1>
        <p className="text-sm font-mono text-[#6B665E]">
          Shadcn / Tailwind CSS / Radix UI Slot
        </p>
      </div>

      {/* DemoOne from component spec */}
      <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex items-center justify-center">
        <DemoOne />
      </div>

      {/* Metal Button Variants Showcase */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-widest text-[#c8f53c]">
          Metal Button Variants
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl">
          <MetalButton variant="default">Default Chrome</MetalButton>
          <MetalButton variant="primary">Primary</MetalButton>
          <MetalButton variant="success">Success</MetalButton>
          <MetalButton variant="gold">Gold</MetalButton>
          <MetalButton variant="bronze">Bronze</MetalButton>
          <MetalButton variant="error">Error</MetalButton>
        </div>
      </div>

      {/* Standard Button Variants */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400">
          CVA Button Variants
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="cool">Cool Glass</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  )
}
