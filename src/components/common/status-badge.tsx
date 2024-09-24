import { cn } from "@/lib/utils";
import { Circle, CircleDot, CircleGauge, EyeIcon, EyeOffIcon } from "lucide-react";

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const baseClasses = "text-xl flex items-center gap-1";
  
  return status ? (
    <div className={cn(baseClasses, className)}>
      <div className="h-3 w-3 bg-green-500 rounded-full" />
      {/* <EyeIcon className={cn("size-5 text-primary", className)} /> */}
    </div>
  ) : (
    <div className={cn(baseClasses, className)}>
      <div className="h-3 w-3 bg-neutral-700 rounded-full" />
      {/* <EyeOffIcon className={cn("size-5 text-white/70", className)} /> */}
    </div>
  );
};
