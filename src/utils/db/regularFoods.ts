"use server";

import { db } from "@/db";
import { InsertregularFood, regularFoods } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

//Insert user regular Foods
export const addRegularFood = async (InputData: InsertregularFood) => {
  await db.insert(regularFoods).values(InputData);
};

//Delete user regular Foods
export const deleteRegularFood = async (itemId: string) => {
  await db.delete(regularFoods).where(eq(regularFoods.id, itemId));
};

//Edit user meal Record
export const editRegularFood = async (InputData: InsertregularFood) => {
  await db
    .update(regularFoods)
    .set({
      id: InputData.id,
      userId: InputData.userId,
      foodName: InputData.foodName,
      gram: InputData.gram,
      kcal: InputData.kcal,
      updatedAt: sql`NOW()`,
    })
    .where(eq(regularFoods.id, InputData.id));
};
