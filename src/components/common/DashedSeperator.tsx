import { cn } from "@/lib/utils";

interface DashedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dashWidth?: string;
  gapWidth?: string;
  direction?: "horizontal" | "vertical";
}

export const DashedSeparator = ({
  className,
  color = "#b4b4b4",
  height = "2px",
  dashWidth = "6px",
  gapWidth = "4px",
  direction = "horizontal"
}: DashedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div className={cn(
      isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
      className,
    )}>
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `linear-gradient(to ${isHorizontal ? 'right' : 'bottom'}, ${color} ${dashWidth}, transparent ${dashWidth})`,
          backgroundSize: isHorizontal
            ? `${parseInt(dashWidth) + parseInt(gapWidth)}px ${height}`
            : `${height} ${parseInt(dashWidth) + parseInt(gapWidth)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
        }}
      />
    </div>
  );
};