"use client";

import {
  ProgressCircle,
  ProgressRatio,
  RemainingKcal,
} from "@/app/dashboard/_components/";
import { getTodayTotalKcal } from "@/utils/api/progress";
import { getEfeectiveTargetKcal } from "@/utils/api/targetKcal";
import { formatYYMMDD } from "@/utils/format/date";
import { mealRecordkeys, TargetKcalkeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type ProgressSectionProps = {
  userId: string;
};

const today = new Date();
const date = formatYYMMDD(today);

const Component = ({ userId }: ProgressSectionProps) => {
  //Get user's diary amount Kcal form mealRecords
  const {
    data: totalKcal,
    isLoading: totalKcalIsLoading,
    isError: totalKcalIsError,
  } = useQuery({
    queryKey: mealRecordkeys.todayTotal(userId, date),
    queryFn: () => getTodayTotalKcal(userId, date),
    meta: { errCode: TErrCodes.PROGRESS_FETCH_FAILED },
  });

  //Get user's targetKcal
  const {
    data: targetKcal,
    isLoading: targetKcalIsLoading,
    isError: targetKcalIsError,
  } = useQuery({
    queryKey: TargetKcalkeys.effective(userId),
    queryFn: () => getEfeectiveTargetKcal(userId, date),
    meta: { errCode: TErrCodes.PROGRESS_FETCH_FAILED },
  });

  const isLoading = totalKcalIsLoading || targetKcalIsLoading;

  //Error for UI
  const progressError = totalKcalIsError || targetKcalIsError;
  const targetKcalError = targetKcalIsError;

  //For progressCircle UI
  const progressValue =
    totalKcal && targetKcal ? Math.floor((totalKcal / targetKcal) * 100) : 0;
  const totalKcalDisplay = totalKcal === undefined ? null : totalKcal;
  const targetKcalDisplay = targetKcal === undefined ? null : targetKcal;

  //For prgoress remainingKcal UI
  const isOver = totalKcal && targetKcal ? totalKcal > targetKcal : null;
  const remainingKcalValue =
    targetKcal != null && totalKcal != null
      ? Math.abs(targetKcal - totalKcal)
      : null;

  return (
    <>
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-3 min-h-[150px]">
        <ProgressCircle
          progressValue={progressValue}
          currentKcalDisplay={totalKcalDisplay}
          currentTargetKcalDisplay={targetKcalDisplay}
          isLoading={isLoading}
          progressError={progressError}
          targetKcalError={targetKcalError}
          className="col-span-1 row-span-2"
        />
        <ProgressRatio
          progressValue={progressValue}
          isLoading={isLoading}
          isError={progressError}
          className="col-start-2 col-span-2"
        />
        <RemainingKcal
          remainingKcalValue={remainingKcalValue}
          isLoading={isLoading}
          isError={progressError}
          isOver={isOver}
          className="col-start-2 col-span-2"
        />
      </div>
    </>
  );
};

const ProgressSection = memo(Component);
export { ProgressSection };
