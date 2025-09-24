import { cn } from "@/lib/utils";
import { memo } from "react";

interface ButtonWithGooleIconProps {
  text: string;
  submitGoogle: () => void;
}

const Component = ({ text, submitGoogle }: ButtonWithGooleIconProps) => {
  return (
    <div className="relative z-10">
      <button
        type="button"
        onClick={submitGoogle}
        className={cn(
          "w-full bg-card text-card-foreground flex items-center justify-center rounded-lg border-1 border-foreground gap-2 px-4 py-2 md:text-sm"
        )}
      >
        {text}
        <div className="absolute top-1 -right-[3px] -z-30 w-[100%] h-[101%] rounded-lg bg-foreground" />
      </button>
    </div>
  );
};

const ButtonWithGooleIcon = memo(Component);
export { ButtonWithGooleIcon };
