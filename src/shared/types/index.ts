//DB由来の型をフロント用に置き換え

import {
  InsertMealRecord,
  InsertregularFood,
  SelectMealRecord,
  SelectregularFood,
} from "@/db/schema";

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

export type RegularFoodsResponse = Omit<
  SelectregularFood,
  "createdAt" | "updatedAt" | "deletedAt"
>;

export type RegularFoodsRequest = Omit<
  InsertregularFood,
  "createdAt" | "updatedAt" | "deletedAt"
>;
