"use clinet";

import { FetchErrorMessage, MealRecordItem } from "@/app/dashboard/_components";
import { mealRecordkeys, TErrCodes } from "@/lib/tanstack";
import { fetchMealRecords } from "@/services/mealRecords";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo } from "react";

type MealRecordListsProps = {
  userId: string;
  date: string;
};

const Component = ({ userId, date }: MealRecordListsProps) => {
  const { data, isError, refetch } = useSuspenseQuery({
    queryKey: mealRecordkeys.dailyList(userId, date),
    queryFn: async () => await fetchMealRecords(date),
    meta: { errCode: TErrCodes.MEAL_FETCH_FAILED },
  });

  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  return (
    <>
      <ul className="w-full">
        {data && data.length > 0 ? (
          data.map((mealRecord) => (
            <MealRecordItem key={mealRecord.id} mealRecord={mealRecord} />
          ))
        ) : (
          <p className="font-medium text-center">今日の食事記録はありません</p>
        )}
      </ul>
    </>
  );
};

const MealRecordLists = memo(Component);
export { MealRecordLists };
