"use client";

import {
  MealRecordAddOption,
  MealRecordLists,
} from "@/app/dashboard/_components/";
import { memo } from "react";

type MealRecordSectionProps = {
  userId: string;
};

const Component = ({ userId }: MealRecordSectionProps) => {
  return (
    <>
      <MealRecordLists userId={userId} />
      <MealRecordAddOption userId={userId} />
    </>
  );
};

const MealRecordSection = memo(Component);
export { MealRecordSection };
