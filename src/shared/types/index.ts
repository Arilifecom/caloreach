//DB由来の型をフロント用に置き換え

import {
  InsertMealRecord,
  InsertregularFood,
  InsertTargetKcalPlansRecord,
  SelectMealRecord,
  SelectregularFood,
  SelectTargetKcalPlansRecord,
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

//TargetKcalPlans
export type TargetKcalPlansResponse = Omit<
  SelectTargetKcalPlansRecord,
  "createdAt" | "updatedAt" | "deletedAt"
>;

export type CreateTargetKcalInput = Omit<
  InsertTargetKcalPlansRecord,
  "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type UpdateTargetKcalInput = Omit<
  InsertTargetKcalPlansRecord,
  "userId" | "createdAt" | "updatedAt" | "deletedAt"
>;
