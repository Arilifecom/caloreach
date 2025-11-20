"use client";

import { HistoryListItem } from "@/app/dashboard/histories/_components/HistoryListItem";
import { Button } from "@/components/ui";
import { encodeCursor } from "@/lib";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

export type DailyKcalSummary = {
  userId: string;
  date: string;
  totalKcal: number;
  targetKcal: number;
};

type HistoryListProps = {
  DailyKcalSummaryList: DailyKcalSummary[];
  nextCursor: string | null;
  hasNext?: boolean;
  hasPrev?: boolean;
};

const Component = ({
  DailyKcalSummaryList,
  nextCursor,
  hasNext,
  hasPrev,
}: HistoryListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNextPage = () => {
    if (!nextCursor) return;

    const encodedCusor = encodeCursor(nextCursor);
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("currentCursor", encodedCusor);
    router.push(`/dashboard/histories?${currentParams.toString()}`);
  };

  return (
    <>
      {DailyKcalSummaryList.length === 0 && (
        <p className="font-medium text-center mb-4">履歴はありません</p>
      )}

      {DailyKcalSummaryList.length > 0 && (
        <ul className="w-full">
          {DailyKcalSummaryList.map((dailyMealRecord) => (
            <HistoryListItem
              key={dailyMealRecord.date}
              data={dailyMealRecord}
            />
          ))}
        </ul>
      )}

      {!hasNext && <p>すべての履歴を表示しました</p>}

      <div className="absolute bottom-24 grid grid-cols-[1fr_auto_1fr] items-center w-full my-4 gap-2 px-2">
        <div className="col-1 border-t"></div>
        <div className="flex justify-center gap-6">
          {hasPrev && (
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={!hasPrev}
              className="flex items-center gap-0 h-11"
            >
              <ChevronLeft />
              Prev
            </Button>
          )}

          {hasNext && (
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={!hasNext}
              className="flex items-center gap-0 h-11"
            >
              Next
              <ChevronRight />
            </Button>
          )}
        </div>
        <div className="col-3 border-t"></div>
      </div>
    </>
  );
};

const HistoryList = memo(Component);
export { HistoryList };
