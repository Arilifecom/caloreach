"use server";

import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { endOfDay, startOfDay } from "date-fns";
import { and, eq, gte, lte, sum } from "drizzle-orm";

//Get user amount Kcal diary mealRecords
export const getTodayTotalKcal = async (userId: string, date: string) => {
  const [res] = await db
    .select({ totalKcal: sum(mealRecords.kcal) })
    .from(mealRecords)
    .where(
      and(
        eq(mealRecords.userId, userId),
        gte(mealRecords.eatenAt, startOfDay(date)),
        lte(mealRecords.eatenAt, endOfDay(date))
      )
    );

  return Number(res?.totalKcal ?? 0);
};
