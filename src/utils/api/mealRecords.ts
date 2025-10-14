"use server";

import { db } from "@/db";
import { InsertMealRecord, mealRecords } from "@/db/schema";
import { endOfDay, startOfDay } from "date-fns";
import { and, asc, eq, gte, lte, sql } from "drizzle-orm";

//Get user diary　mealRecords
export const fetchUserDailyMealRecords = async (
  userId: string,
  date: string
) => {
  const res = await db.query.mealRecords.findMany({
    where: and(
      eq(mealRecords.userId, userId),
      gte(mealRecords.eatenAt, startOfDay(date)),
      lte(mealRecords.eatenAt, endOfDay(date))
    ),
    orderBy: [asc(mealRecords.eatenAt), asc(mealRecords.id)],
  });
  return res;
};

//Insert user meal Record
export const addMealRecord = async (InputData: InsertMealRecord) => {
  await db.insert(mealRecords).values(InputData);
};

//Delete user meal Record
export const deleteMealRecord = async (itemId: string) => {
  await db.delete(mealRecords).where(eq(mealRecords.id, itemId));
};

//Edit user meal Record
export const editMealRecord = async (InputData: InsertMealRecord) => {
  await db
    .update(mealRecords)
    .set({
      id: InputData.id,
      userId: InputData.userId,
      foodName: InputData.foodName,
      gram: InputData.gram,
      kcal: InputData.kcal,
      eatenAt: InputData.eatenAt,
      updatedAt: sql`NOW()`,
    })
    .where(eq(mealRecords.id, InputData.id));
};
