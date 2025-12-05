import { ScaleIcon } from "@/components/icons";
import { CardContent, CardWithShadow } from "@/components/ui";
import { cn } from "@/lib/utils";
import { memo } from "react";

type RemainingKcalProps = {
  remainingKcalValue: number | null;
  isLoading: boolean;
  className?: string;
  isError: boolean;
  isOver: boolean | null;
};

const Component = ({
  remainingKcalValue,
  isLoading,
  className,
  isError,
  isOver,
}: RemainingKcalProps) => {
  const formattedRemainingKcal = remainingKcalValue?.toLocaleString("ja-JP");

  return (
    <CardWithShadow className={cn("py-4", className)}>
      <CardContent className="px-4">
        <div className="flex justify-left gap-2">
          <ScaleIcon className="w-8" />
          <div className="flex flex-col">
            <span className="text-xs font-medium -mb-1">残りカロリー</span>
            {isLoading ? (
              <span className="text-xs text-gray-500 pt-2">取得中...</span>
            ) : isError ? (
              <p className="text-xl font-black">--</p>
            ) : (
              <p className="text-xl font-black">
                {isOver && "+"}
                {formattedRemainingKcal}
                <span className="text-sm ml-1">Kcal</span>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </CardWithShadow>
  );
};

const RemainingKcal = memo(Component);
export { RemainingKcal };
