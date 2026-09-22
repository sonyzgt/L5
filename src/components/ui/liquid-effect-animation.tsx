"use client"

import { useEffect, useRef, useCallback } from "react"

export interface LiquidEffectAnimationProps {
  mode?: "background" | "hero"
  text?: string[]
  subText?: string
  tagline?: string
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  className?: string
  metalness?: number
  roughness?: number
  displacementScale?: number
  rain?: boolean
}

export function LiquidEffectAnimation({
  mode = "hero",
  text,
  subText,
  tagline,
  backgroundColor = "#090a0c",
  textColor = "#f3f4f6",
  accentColor = "#c8f53c",
  className = "",
  metalness = 0.45,
  roughness = 0.35,
  displacementScale = 2.5,
  rain = true,
}: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<any>(null)

  const generateTextImage = useCallback(() => {
    if (typeof window === "undefined") return null
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const offscreen = document.createElement("canvas")
    const w = window.innerWidth
    const h = window.innerHeight
    offscreen.width = w * dpr
    offscreen.height = h * dpr
    const ctx = offscreen.getContext("2d")
    if (!ctx) return null

    ctx.scale(dpr, dpr)

    // Base background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, w, h)

    // Ambient Lighting & Gradients for WebGL reflection
    ctx.globalCompositeOperation = "screen"

    // Top primary accent glow (KAWA lime/emerald)
    const glow1 = ctx.createRadialGradient(w * 0.5, h * 0.15, 0, w * 0.5, h * 0.15, w * 0.55)
    glow1.addColorStop(0, "rgba(200, 245, 60, 0.12)")
    glow1.addColorStop(0.5, "rgba(200, 245, 60, 0.03)")
    glow1.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = glow1
    ctx.fillRect(0, 0, w, h)

    // Bottom soft cyan/slate ambient glow
    const glow2 = ctx.createRadialGradient(w * 0.8, h * 0.85, 0, w * 0.8, h * 0.85, w * 0.5)
    glow2.addColorStop(0, "rgba(56, 189, 248, 0.08)")
    glow2.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = glow2
    ctx.fillRect(0, 0, w, h)

    // Left subtle indigo depth
    const glow3 = ctx.createRadialGradient(w * 0.15, h * 0.6, 0, w * 0.15, h * 0.6, w * 0.4)
    glow3.addColorStop(0, "rgba(99, 102, 241, 0.06)")
    glow3.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = glow3
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = "source-over"

    // Background architectural geometric watermark (Hexagon / KAWA style)
    const centerX = w / 2
    const centerY = h / 2
    const emblemRadius = Math.min(w, h) * 0.22

    ctx.save()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)"
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6
      const px = centerX + emblemRadius * Math.cos(angle)
      const py = centerY + emblemRadius * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.stroke()

    // Inner concentric accent circle
    ctx.strokeStyle = "rgba(200, 245, 60, 0.06)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(centerX, centerY, emblemRadius * 0.65, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()

    // Render text if in hero mode or if text is provided
    const hasContent = (text && text.length > 0) || subText || tagline

    if (hasContent) {
      if (subText) {
        ctx.fillStyle = textColor
        ctx.globalAlpha = 0.5
        const subFontSize = Math.max(12, w * 0.009)
        ctx.font = `600 ${subFontSize}px -apple-system, "SF Pro Display", "Inter", sans-serif`
        ctx.textAlign = "center"
        ctx.letterSpacing = "0.3em"
        ctx.fillText(subText.toUpperCase(), w / 2, h / 2 - w * 0.09)
      }

      // Main heading
      const fontSize = Math.min(w * 0.12, h * 0.18)
      ctx.globalAlpha = 0.95
      ctx.letterSpacing = "-0.03em"
      ctx.font = `700 ${fontSize}px -apple-system, "SF Pro Display", "Inter", sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const lineHeight = fontSize * 1.08
      const totalHeight = (text?.length || 0) * lineHeight
      const startY = h / 2 - totalHeight / 2 + lineHeight / 2

      text?.forEach((line, i) => {
        ctx.fillStyle = textColor
        ctx.fillText(line, w / 2, startY + i * lineHeight)
      })

      const dividerY = startY + (text?.length || 0) * lineHeight + w * 0.018

      if (text?.length && tagline) {
        ctx.globalAlpha = 0.25
        ctx.fillStyle = accentColor
        ctx.fillRect(w / 2 - 40, dividerY, 80, 1)
      }

      if (tagline) {
        ctx.globalAlpha = 0.5
        ctx.letterSpacing = "0.08em"
        const tagFontSize = Math.max(12, w * 0.01)
        ctx.font = `400 ${tagFontSize}px -apple-system, "SF Pro Text", "Inter", sans-serif`
        ctx.fillText(tagline, w / 2, dividerY + w * 0.025)
      }
    }

    return offscreen.toDataURL("image/png")
  }, [text, subText, tagline, backgroundColor, textColor, accentColor])

  useEffect(() => {
    if (!canvasRef.current) return

    const dataUrl = generateTextImage()
    if (!dataUrl) return

    let isMounted = true

    // Load Three.js Liquid Background via dynamic ESM module
    const loadLiquidModule = new Function("url", "return import(url)")
    loadLiquidModule("https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/liquid1.min.js")
      .then((module: any) => {
        if (!isMounted || !canvasRef.current) return

        const LiquidBackground = module.default
        const app = LiquidBackground(canvasRef.current)
        appRef.current = app

        app.loadImage(dataUrl)
        app.liquidPlane.material.metalness = metalness
        app.liquidPlane.material.roughness = roughness
        app.liquidPlane.uniforms.displacementScale.value = displacementScale
        app.setRain(rain)
        if (rain) {
          app.setRainTime(1.2)
        }

        // Global mouse/touch interaction for background mode
        const handlePointerMove = (e: PointerEvent) => {
          if (!appRef.current?.liquidPlane) return
          const x = (e.clientX / window.innerWidth) * 2 - 1
          const y = -(e.clientY / window.innerHeight) * 2 + 1
          appRef.current.liquidPlane.addDrop(x, y, 0.028, 0.0035)
        }

        const handlePointerDown = (e: PointerEvent) => {
          if (!appRef.current?.liquidPlane) return
          const x = (e.clientX / window.innerWidth) * 2 - 1
          const y = -(e.clientY / window.innerHeight) * 2 + 1
          appRef.current.liquidPlane.addDrop(x, y, 0.045, 0.06)
        }

        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        window.addEventListener("pointerdown", handlePointerDown, { passive: true })

        ;(app as any)._cleanupListeners = () => {
          window.removeEventListener("pointermove", handlePointerMove)
          window.removeEventListener("pointerdown", handlePointerDown)
        }
      })
      .catch((err: unknown) => {
        console.warn("LiquidEffectAnimation failed to initialize:", err)
      })

    return () => {
      isMounted = false
      if (appRef.current) {
        if (typeof appRef.current._cleanupListeners === "function") {
          appRef.current._cleanupListeners()
        }
        if (typeof appRef.current.dispose === "function") {
          appRef.current.dispose()
        }
        appRef.current = null
      }
    }
  }, [generateTextImage, metalness, roughness, displacementScale, rain])

  // Resize handler to recreate background texture on window resize
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (appRef.current) {
          const newDataUrl = generateTextImage()
          if (newDataUrl) {
            appRef.current.loadImage(newDataUrl)
          }
        }
      }, 250)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("resize", handleResize)
    }
  }, [generateTextImage])

  const isBackground = mode === "background"

  return (
    <div
      className={`${
        isBackground
          ? "fixed inset-0 pointer-events-none -z-10 overflow-hidden"
          : "fixed inset-0 m-0 w-full h-full overflow-hidden touch-none"
      } ${className}`}
      aria-hidden={isBackground ? "true" : undefined}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ pointerEvents: isBackground ? "none" : "auto" }}
      />
    </div>
  )
}
