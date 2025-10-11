"use clinet";

import { ActionMenu, List, Loading } from "@/components";
import { InsertMealRecord, SelectMealRecord } from "@/db/schema";
import { format } from "date-fns";
import { memo } from "react";

type MealRecordListProps = {
  mealRecords: SelectMealRecord[] | null;
  deleteRecord: (id: string) => void;
  editRecord: (InputData: InsertMealRecord) => void;
};

const Component = ({
  mealRecords,
  deleteRecord,
  editRecord,
}: MealRecordListProps) => {
  return (
    <>
      <ul className="w-full">
        {mealRecords === null ? (
          <Loading />
        ) : mealRecords.length > 0 ? (
          mealRecords.map((mealRecord) => (
            <li key={mealRecord.id} className="mb-2 text-sm">
              <List>
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-3">
                    <p>{format(mealRecord.eatenAt, "HH:mm")}</p>
                    <div>
                      <h3 className="font-bold text-sm">
                        {mealRecord.foodName}
                      </h3>
                      <p className="text-xs">
                        {mealRecord.gram}g / {mealRecord.kcal}kcal
                      </p>
                    </div>
                  </div>
                  <ActionMenu
                    mealRecord={mealRecord}
                    deleteRecord={deleteRecord}
                    editRecord={editRecord}
                  />
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

const MealRecordList = memo(Component);
export { MealRecordList };
