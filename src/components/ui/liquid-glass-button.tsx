"use client"

import * as React from "react"
import Link from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90",
        cool: "bg-neutral-900 border border-white/10 text-white hover:border-[#c8f53c]/40",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

/* Sterling Gate Quiet Luxury Kinetic Button Variants */
const liquidbuttonVariants = cva(
  "relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full font-mono font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#131622] text-white border border-white/12 hover:border-white/30 hover:bg-[#1a1e2e] hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-black/50",
        kawa:
          "bg-[#c8f53c] text-[#08090c] font-bold border border-[#c8f53c] hover:bg-[#d4fa58] hover:shadow-[0_0_24px_rgba(200,245,60,0.45)] hover:scale-[1.03] active:scale-[0.97]",
        secondary:
          "bg-[#181b28] text-neutral-200 border border-white/10 hover:border-[#c8f53c]/40 hover:text-white hover:scale-[1.02] active:scale-[0.97]",
        outline:
          "bg-transparent text-white border border-white/15 hover:border-white/40 hover:bg-white/5",
        ghost:
          "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-900/30",
        link:
          "text-[#c8f53c] underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs",
        nav: "h-8 px-3.5 py-1 text-xs gap-1.5",
        sm: "h-8 text-xs gap-1.5 px-3",
        lg: "h-11 rounded-full px-6 text-xs",
        xl: "h-12 rounded-full px-8 text-xs",
        xxl: "h-14 rounded-full px-10 text-sm",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xl",
    },
  }
)

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean
  href?: string
  target?: string
  rel?: string
}

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  href,
  children,
  ...props
}: LiquidButtonProps) {
  const content = (
    <span className="flex items-center justify-center gap-2 w-full h-full">
      {children}
    </span>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(liquidbuttonVariants({ variant, size }), className)}
        {...(props as any)}
      >
        {content}
      </Link>
    )
  }

  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(liquidbuttonVariants({ variant, size }), className)}
      {...props}
    >
      {content}
    </Comp>
  )
}

/* MetalButton export for compatibility */
export interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "gold" | "bronze" | "error" | string
}

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-5 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300",
          variant === "primary" || variant === "accent"
            ? "bg-[#c8f53c] text-[#08090c] border border-[#c8f53c] hover:shadow-[0_0_20px_rgba(200,245,60,0.4)] hover:scale-105"
            : "bg-[#141722] text-white border border-white/12 hover:border-white/30 hover:bg-[#1a1e2b] hover:scale-105",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
MetalButton.displayName = "MetalButton"

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton }
export default LiquidButton
