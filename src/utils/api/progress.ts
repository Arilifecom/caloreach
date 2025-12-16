"use server";

import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { and, eq, sql, sum } from "drizzle-orm";

//Get user amount Kcal diary mealRecords
export const getTodayTotalKcal = async (userId: string, date: string) => {
  const [res] = await db
    .select({ totalKcal: sum(mealRecords.kcal) })
    .from(mealRecords)
    .where(
      and(
        eq(mealRecords.userId, userId),
        sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`
      )
    );

  return Number(res?.totalKcal ?? 0);
};
