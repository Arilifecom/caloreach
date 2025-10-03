"use client";
import { useMealRecords } from "@/app/dashbord/_components/hooks";
import { MealRecordAddOption } from "@/app/dashbord/_components/MealRecordAddOption";
import { MealRecordList } from "@/app/dashbord/_components/MealRecordList";

type MealRecordSectionProps = {
  userId: string;
};

export const MealRecordSection = ({ userId }: MealRecordSectionProps) => {
  const today = new Date();
  const { mealRecords, addRecord } = useMealRecords(userId, today);

  return (
    <>
      <MealRecordList mealRecords={mealRecords} />
      <MealRecordAddOption userId={userId} addRecord={addRecord} />
    </>
  );
};
