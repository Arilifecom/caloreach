"use server";

import { db } from "@/db";
import { InsertMealRecord, mealRecords } from "@/db/schema";
import { endOfDay, startOfDay } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";

//Get user meal Record
export const getMealRecordByUserId = async (userId: string, date: Date) => {
  const res = await db.query.mealRecords.findMany({
    where: and(
      eq(mealRecords.userId, userId),
      gte(mealRecords.eatenAt, startOfDay(date)),
      lte(mealRecords.eatenAt, endOfDay(date))
    ),
  });
  return res;
};

//Insert user meal Record
export const addMealRecord = async (InputData: InsertMealRecord) => {
  await db.insert(mealRecords).values(InputData);
};
