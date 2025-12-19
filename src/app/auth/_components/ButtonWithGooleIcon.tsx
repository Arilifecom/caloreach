import { Loading } from "@/components";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface ButtonWithGooleIconProps {
  text: string;
  submitGoogle: () => void;
  isLoading: boolean;
}

const Component = ({
  text,
  submitGoogle,
  isLoading,
}: ButtonWithGooleIconProps) => {
  return (
    <div className="relative z-10">
      <button
        type="button"
        onClick={submitGoogle}
        disabled={isLoading}
        className={cn(
          "w-full bg-card text-card-foreground flex items-center justify-center rounded-lg border-1 border-foreground gap-2 px-4 py-2 text-sm"
        )}
      >
        {isLoading ? <Loading /> : text}
        <div className="absolute top-1 -right-[3px] -z-30 w-[100%] h-[101%] rounded-lg bg-foreground" />
      </button>
    </div>
  );
};

const ButtonWithGooleIcon = memo(Component);
export { ButtonWithGooleIcon };
