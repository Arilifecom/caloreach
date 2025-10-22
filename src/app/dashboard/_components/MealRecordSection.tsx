"use client";

import {
  MealRecordAddOption,
  MealRecordListBoundary,
} from "@/app/dashboard/_components/";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
};

const Component = ({ userId }: MealRecordSectionProps) => {
  return (
    <>
      <MealRecordListBoundary userId={userId} />
      <MealRecordAddOption userId={userId} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
