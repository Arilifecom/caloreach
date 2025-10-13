"use client";

import { ActionMenu, List } from "@/components";
import { SelectMealRecord } from "@/db/schema";
import { format } from "date-fns";
import { memo } from "react";

type MealRecordItemProps = {
  mealRecord: SelectMealRecord;
};

const Component = ({ mealRecord }: MealRecordItemProps) => {
  return (
    <>
      <li key={mealRecord.id} className="mb-2 text-sm">
        <List>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <p>{format(mealRecord.eatenAt, "HH:mm")}</p>
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
