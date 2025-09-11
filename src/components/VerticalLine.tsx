import { memo } from "react";

interface VerticalLine {
  className?: string;
}

function Component({ className }: VerticalLine) {
  return (
    <div className={`flex items-center w-full ${className}`}>
      <div className="flex-1 border-t"></div>
    </div>
  );
}

const VerticalLine = memo(Component);
export { VerticalLine };
