"use client";

import {
  MealRecordAddOption,
  MealRecordLists,
  MealRecordListsSkeleton,
} from "@/app/dashboard/_components/";
import { memo, Suspense } from "react";

type MealRecordSectionProps = {
  userId: string;
  targetDate: string;
};

const Component = ({ userId, targetDate }: MealRecordSectionProps) => {
  return (
    <>
      <Suspense fallback={<MealRecordListsSkeleton />}>
        <MealRecordLists userId={userId} date={targetDate} />
        <MealRecordAddOption userId={userId} date={targetDate} />
      </Suspense>
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
