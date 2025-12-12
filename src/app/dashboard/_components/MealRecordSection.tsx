"use client";

import {
  MealRecordAddOption,
  MealRecordLists,
} from "@/app/dashboard/_components/";
import { formatYYMMDD } from "@/utils/format/date";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
  recordDate?: string;
};

const Component = ({ userId, recordDate }: MealRecordSectionProps) => {
  const date = recordDate ? recordDate : formatYYMMDD(new Date());

  return (
    <>
      <MealRecordLists userId={userId} date={date} />
      <MealRecordAddOption userId={userId} date={date} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
