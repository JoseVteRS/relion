import { cn } from "@/lib/utils";
import { LockIcon } from "lucide-react";

import { } from "react-icons";
import { MdOutlineLock } from "react-icons/md";

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const baseClasses = "text-xl flex items-center gap-1";

  const isPublic = status;

  return isPublic ? null : (
    <div className={cn(baseClasses, className)}>
      <span className="p-2 flex items-center justify-center text-xs text-muted-foreground">
        <MdOutlineLock className="size-3.5" />
      </span>
    </div>
  );
};
