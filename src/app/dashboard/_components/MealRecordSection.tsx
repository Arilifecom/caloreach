"use client";

import {
  MealRecordAddOption,
  MealRecordLists,
} from "@/app/dashboard/_components/";
import { formatYYMMDD } from "@/utils/format/date";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
  targetDate?: string;
};

const Component = ({ userId, targetDate }: MealRecordSectionProps) => {
  // Use targetDate when referencing past data or get current-day
  const date = targetDate ? targetDate : formatYYMMDD(new Date());

  return (
    <>
      <MealRecordLists userId={userId} date={date} />
      <MealRecordAddOption userId={userId} date={date} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
