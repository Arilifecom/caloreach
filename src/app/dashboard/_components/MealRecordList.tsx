"use clinet";

import { MealRecordItem } from "@/app/dashboard/_components";
import { Loading } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { getToday } from "@/utils/format";
import { mealRecordkeys } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type MealRecordListProps = {
  userId: string;
};

const today = getToday();

const Component = ({ userId }: MealRecordListProps) => {
  const { data, isFetching } = useQuery({
    queryKey: mealRecordkeys.dailyList(userId, today),
    queryFn: () => fetchUserDailyMealRecords(userId, today),
    throwOnError: true,
  });

  if (isFetching) return <Loading />;

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

const MealRecordList = memo(Component);
export { MealRecordList };
