"use client";

import {
  MealRecordAddOption,
  MealRecordLists,
} from "@/app/dashboard/_components/";
import { formatYYMMDD } from "@/utils/format/date";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
};

const today = new Date();
const date = formatYYMMDD(today);

const Component = ({ userId }: MealRecordSectionProps) => {
  return (
    <>
      <MealRecordLists userId={userId} date={date} />
      <MealRecordAddOption userId={userId} date={date} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
