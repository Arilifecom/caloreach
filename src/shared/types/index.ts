//DB由来の型をフロント用に置き換え

import { InsertMealRecord, SelectMealRecord } from "@/db/schema";

export type MealRecordResponse = Omit<
  SelectMealRecord,
  "createdAt" | "updatedAt" | "deletedAt" | "eatenAt"
> & {
  eatenAt: string;
};

export type MealRecordRequest = Omit<
  InsertMealRecord,
  "createdAt" | "updatedAt" | "deletedAt" | "eatenAt"
> & {
  eatenAt: string;
};
