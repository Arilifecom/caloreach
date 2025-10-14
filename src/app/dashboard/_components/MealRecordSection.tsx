"use client";

import { MealRecordAddOption } from "@/app/dashboard/_components/MealRecordAddOption";
import { MealRecordList } from "@/app/dashboard/_components/MealRecordList";
import { getToday } from "@/utils/format";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
};

const today = getToday();

const Component = ({ userId }: MealRecordSectionProps) => {
  return (
    <>
      <MealRecordList userId={userId} date={today} />
      <MealRecordAddOption userId={userId} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
