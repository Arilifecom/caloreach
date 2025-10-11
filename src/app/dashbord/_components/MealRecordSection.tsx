"use client";
import { useMealRecords } from "@/app/dashbord/_components/hooks";
import { MealRecordAddOption } from "@/app/dashbord/_components/MealRecordAddOption";
import { MealRecordList } from "@/app/dashbord/_components/MealRecordList";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
};

const Component = ({ userId }: MealRecordSectionProps) => {
  const today = new Date();
  const { mealRecords, addRecord, deleteRecord, editRecord } = useMealRecords(
    userId,
    today
  );

  return (
    <>
      <MealRecordList
        mealRecords={mealRecords}
        deleteRecord={deleteRecord}
        editRecord={editRecord}
      />
      <MealRecordAddOption userId={userId} addRecord={addRecord} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
