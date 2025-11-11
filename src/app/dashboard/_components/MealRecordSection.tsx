"use client";

import {
  MealRecordAddOption,
  MealRecordLists,
} from "@/app/dashboard/_components/";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
  date: string;
};

const Component = ({ userId, date }: MealRecordSectionProps) => {
  return (
    <>
      <MealRecordLists userId={userId} date={date} />
      <MealRecordAddOption userId={userId} date={date} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
