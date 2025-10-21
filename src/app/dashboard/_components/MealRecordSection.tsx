"use client";

import { MealRecordAddOption } from "@/app/dashboard/_components/";
import { MealRecordList } from "@/app/dashboard/_components/";
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
