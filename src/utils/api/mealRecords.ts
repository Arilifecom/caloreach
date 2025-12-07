"use server";

import { db } from "@/db";
import {
  foods,
  InsertMealRecord,
  mealRecords,
  SelectMealRecord,
  userFoodSelections,
} from "@/db/schema";
import { endOfDay, startOfDay } from "date-fns";
import { and, asc, eq, gte, like, lte, sql } from "drizzle-orm";
import { v7 as uuidv7 } from "uuid";

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
  return db.transaction(async (tx) => {
    await tx.insert(mealRecords).values(InputData);

    if (InputData.foodId) {
      await tx.insert(userFoodSelections).values({
        id: uuidv7(),
        userId: InputData.userId,
        foodId: InputData.foodId,
      });
    }
  });
};

//Delete user meal Record
export const deleteMealRecord = async (InputData: SelectMealRecord) => {
  return db.transaction(async (tx) => {
    await tx.delete(mealRecords).where(eq(mealRecords.id, InputData.id));

    if (InputData.foodId) {
      await tx
        .delete(userFoodSelections)
        .where(eq(userFoodSelections.foodId, InputData.foodId));
    }
  });
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

//Search food by keyword from foods table
export const fetchFoodsBySearch = async (keyword: string) => {
  if (!keyword) return [];

  const res = await db.query.foods.findMany({
    where: like(foods.reading, `%${keyword}%`),
    limit: 10,
    columns: {
      id: true,
      foodName: true,
      kcalPer100g: true,
    },
  });

  return res;
};
