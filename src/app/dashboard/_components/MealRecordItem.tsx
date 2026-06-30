"use client";

import { ActionMenu } from "@/app/dashboard/_components/";
import { List } from "@/components";
import { MealRecordResponse } from "@/shared/types/";
import { formatUtcToJstTime } from "@/utils/format/date";
import { memo } from "react";

type MealRecordItemProps = {
  mealRecord: MealRecordResponse;
};

const Component = ({ mealRecord }: MealRecordItemProps) => {
  return (
    <>
      <li key={mealRecord.id} className="mb-2 text-sm">
        <List>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <p>{formatUtcToJstTime(mealRecord.eatenAt)}</p>
              <div>
                <h3 className="font-bold text-sm">{mealRecord.foodName}</h3>
                <p className="text-xs">
                  {mealRecord.gram}g / {mealRecord.kcal}kcal
                </p>
              </div>
            </div>
            <ActionMenu mealRecord={mealRecord} />
          </div>
        </List>
      </li>
    </>
  );
};

const MealRecordItem = memo(Component);
export { MealRecordItem };
