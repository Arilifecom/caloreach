"use clinet";

import { MealRecordItem } from "@/app/dashbord/_components";
import { Loading } from "@/components";
import { getMealRecordByUserId } from "@/utils/api/mealRecords";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type MealRecordListProps = {
  userId: string;
};

const Component = ({ userId }: MealRecordListProps) => {
  const fetchMealRecords = async () => {
    const today = new Date();
    const res = await getMealRecordByUserId(userId, today);
    return res;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["mealRecords"],
    queryFn: fetchMealRecords,
  });

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ul className="w-full">
        {data ? (
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
