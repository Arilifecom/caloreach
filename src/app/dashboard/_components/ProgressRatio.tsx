import { FlagIcon } from "@/components/icons";
import { CardContent, CardWithShadow } from "@/components/ui";
import { cn } from "@/lib/utils";
import { memo } from "react";

type ProgressRatioProps = {
  progressValue: number | null;
  isLoading: boolean;
  className?: string;
  isError: boolean;
};

const Component = ({
  progressValue,
  isLoading,
  className,
  isError,
}: ProgressRatioProps) => {
  return (
    <CardWithShadow className={cn("py-4", className)}>
      <CardContent className="pl-2 flex justify-left items-center gap-1">
        <div className="">
          <FlagIcon className="w-6" />
        </div>
        <div className="items-center">
          <div className="flex flex-col">
            <span className="text-xs font-medium -mb-1">達成率</span>
            {isLoading ? (
              <span className="text-xs text-gray-500 pt-2 min-h-8">
                取得中...
              </span>
            ) : isError ? (
              <p className="text-2xl font-black">--</p>
            ) : (
              <p className="text-2xl font-black">
                {progressValue}
                <span className="text-sm ml-1">%</span>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </CardWithShadow>
  );
};

const ProgressRatio = memo(Component);
export { ProgressRatio };
