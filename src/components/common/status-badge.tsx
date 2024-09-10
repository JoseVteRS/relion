import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const baseClasses = "text-xl flex items-center gap-1";
  
  return status ? (
    <span className={cn(baseClasses, className)}>
      <EyeIcon className={cn("size-5 text-primary", className)} />
    </span>
  ) : (
    <span className={cn(baseClasses, className)}>
      <EyeOffIcon className={cn("size-5 text-white/70", className)} />
    </span>
  );
};
