"use clinet";

import { MealRecordItem } from "@/app/dashboard/_components";
import { Loading } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { mealRecordkeys } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type MealRecordListProps = {
  userId: string;
  date: string;
};

const Component = ({ userId, date }: MealRecordListProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: mealRecordkeys.all(),
    queryFn: () => fetchUserDailyMealRecords(userId, date),
  });

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

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
