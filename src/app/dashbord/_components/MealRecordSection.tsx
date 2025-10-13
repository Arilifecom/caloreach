"use client";

import { MealRecordAddOption } from "@/app/dashbord/_components/MealRecordAddOption";
import { MealRecordList } from "@/app/dashbord/_components/MealRecordList";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
};

const Component = ({ userId }: MealRecordSectionProps) => {
  return (
    <>
      <MealRecordList userId={userId} />
      <MealRecordAddOption userId={userId} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
