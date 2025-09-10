import { memo } from "react";

interface VerticalLineWithTextProps {
  text: string;
}

function Component({ text }: VerticalLineWithTextProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full my-4 gap-2">
      <div className="col-1 border-t"></div>
      <span className="col-2 w-full text-sm text-gray-500">{text}</span>
      <div className="col-3 border-t"></div>
    </div>
  );
}

const VerticalLineWithText = memo(Component);
export { VerticalLineWithText };
