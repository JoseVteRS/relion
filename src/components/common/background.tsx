"use client";

import { cn } from "@/lib/utils";

interface BackgroundProps {
  size?: string;
  blur?: string;
  color?: string;
  position?: string;
  className?: string;
}

export const Background = ({
  size = "w-60 h-60",
  blur = "blur-[200px]",
  color = "bg-primary",
  position = "top-80 md:top-56",
  className,
}: BackgroundProps) => {
  return (
    <div
      className={cn(
        "-z-10 rounded-full absolute pointer-events-none select-none",
        size,
        blur,
        color,
        position,
        className
      )}
    ></div>
  );
};