import { cn } from "@/lib/utils";
import { memo } from "react";

interface VerticalLineProps {
  text?: string;
  className?: string;
}

function Component({ text, className }: VerticalLineProps) {
  if (text) {
    return (
      <div
        className={cn(
          "grid grid-cols-[1fr_auto_1fr] items-center w-full my-4 gap-2",
          className
        )}
      >
        <div className="col-1 border-t"></div>
        <span className="col-2 w-full text-sm text-gray-500">{text}</span>
        <div className="col-3 border-t"></div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center w-full", className)}>
      <div className="flex-1 border-t"></div>
    </div>
  );
}

const VerticalLine = memo(Component);
export { VerticalLine };
