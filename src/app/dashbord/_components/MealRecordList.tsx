"use clinet";

import { ActionMenu, List, Loading } from "@/components";
import { SelectMealRecord } from "@/db/schema";
import { format } from "date-fns";

type MealRecordListProps = {
  mealRecords: SelectMealRecord[] | null;
};

export const MealRecordList = ({ mealRecords }: MealRecordListProps) => {
  return (
    <>
      <ul className="w-full">
        {mealRecords === null ? (
          <Loading />
        ) : mealRecords.length > 0 ? (
          mealRecords.map((meal) => (
            <li key={meal.id} className="mb-2 text-sm">
              <List>
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-3">
                    <p>{format(meal.eatenAt, "HH:mm")}</p>
                    <div>
                      <h3 className="font-bold text-sm">{meal.foodName}</h3>
                      <p className="text-xs">
                        {meal.gram}g / {meal.kcal}kcal
                      </p>
                    </div>
                  </div>
                  <ActionMenu />
                </div>
              </List>
            </li>
          ))
        ) : (
          <p className="font-medium text-center">今日の食事記録はありません</p>
        )}
      </ul>
    </>
  );
};
