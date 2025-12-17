import { MealRecordItemSkeleton } from "@/app/dashboard/_components/MealRecordItemSkeleton";

export const MealRecordListsSkeleton = () => {
  return (
    <>
      <ul className="w-full">
        <MealRecordItemSkeleton />
        <MealRecordItemSkeleton />
        <MealRecordItemSkeleton />
      </ul>
    </>
  );
};
