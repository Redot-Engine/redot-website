"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const animationVariants = cva("transform transition-transform duration-200", {
  variants: {
    pressEffect: {
      subtle: "active:scale-95",
      medium: "active:scale-90",
      strong: "active:scale-85",
    },
    hoverEffect: {
      none: "",
      lift: "hover:translate-y-[-2px]",
      grow: "hover:scale-105",
    },
    transitionSpeed: {
      fast: "duration-100",
      default: "duration-200",
      slow: "duration-300",
    },
  },
  defaultVariants: {
    pressEffect: "medium",
    hoverEffect: "none",
    transitionSpeed: "default",
  },
});

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof Button>,
    VariantProps<typeof animationVariants> {
  asChild?: boolean;
}

export function AnimatedButton({
  className,
  variant,
  size,
  asChild = false,
  pressEffect,
  hoverEffect,
  transitionSpeed,
  ...props
}: Readonly<AnimatedButtonProps>) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      className={cn(
        animationVariants({ pressEffect, hoverEffect, transitionSpeed }),
        className
      )}
      variant={variant}
      size={size}
      asChild={asChild}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => isPressed && setIsPressed(false)}
      {...props}
    />
  );
}
