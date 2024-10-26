import { cn } from "@/lib/utils";
import {
  LockKeyhole,
} from "lucide-react";

import { } from "react-icons";

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const baseClasses = "text-xl flex items-center gap-1";

  return status ? null : (
    <div className={cn(baseClasses, className)}>
      <span className="border border-muted-foreground/20 p-1 rounded-md size-5 flex items-center justify-center">
        <LockKeyhole className="size-2.5" />
      </span>
    </div>
  );
};
