"use server";

import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { eq } from "drizzle-orm";

//Get user meal Record
const getMealRecordAction = async (userId: string) => {
  const res = await db.query.mealRecords.findMany({
    where: eq(mealRecords.userId, userId),
  });
  return res;
};

export { getMealRecordAction };
