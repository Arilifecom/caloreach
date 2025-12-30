"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CardWithShadow } from "@/components/ui";

interface CircularProgressProps {
  progressValue: number;
  currentKcalDisplay: number | null;
  currentTargetKcalDisplay: number | null;
  className?: string;
  progressClassName?: string;
  progressError: boolean;
  targetKcalError: boolean;
  isLoading: boolean;
}

const Component = ({
  progressValue,
  currentKcalDisplay,
  currentTargetKcalDisplay,
  className,
  progressClassName,
  progressError,
  targetKcalError,
  isLoading,
}: CircularProgressProps) => {
  const size = 200;
  const radius = size / 2 - 10;
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;

  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - progressValue) / 100));
  const overProgress = Math.max(progressValue - 100, 0);

  const overPercentage =
    circumference * (1 - Math.min(overProgress, 100) / 100);

  return (
    <CardWithShadow className={(cn("p-0"), className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={viewBox}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(-90deg)" }}
          className="relative"
        >
          {/* Base Circle */}
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset="0"
            className={cn("stroke-primary/25")}
          />

          {/* Progress */}
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDashoffset={percentage}
            fill="transparent"
            strokeDasharray={circumference}
            className={cn("stroke-primary", progressClassName)}
          />

          {/* over 100% */}
          {overPercentage > 0 && (
            <circle
              r={radius}
              cx={size / 2}
              cy={size / 2}
              strokeWidth="14"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={overPercentage}
              className={cn("stroke-amber-400", progressClassName)}
            />
          )}
        </svg>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isLoading ? (
          <span className="text-xs text-gray-500 pt-2">取得中...</span>
        ) : (
          <>
            <span className="text-2xl font-black leading-none min-h-8 flex items-center justify-center">
              {progressError ? "--" : currentKcalDisplay?.toLocaleString()}
            </span>
            <span className="block w-10 border-b border-muted-foreground my-1" />
            <span className="text-sm font-semibold leading-none min-h-6 flex items-center justify-center">
              {targetKcalError
                ? "--"
                : currentTargetKcalDisplay?.toLocaleString()}
              kcal
            </span>
          </>
        )}
      </div>
    </CardWithShadow>
  );
};

const ProgressCircle = React.memo(Component);
export { ProgressCircle };
