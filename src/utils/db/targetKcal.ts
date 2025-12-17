"use server";

import { db } from "@/db";
import { InsertTargetKcalPlansRecord, targetKcalPlans } from "@/db/schema";
import { asc, eq, sql } from "drizzle-orm";

//fetch user targetKcal
export const fetchUserTargetKcal = async (userId: string) => {
  const res = await db.query.targetKcalPlans.findMany({
    where: eq(targetKcalPlans.userId, userId),
    orderBy: asc(targetKcalPlans.effectiveDate),
  });
  return res;
};

//Insert user's TargetKcal
export const createTargetKcal = async (
  InputData: InsertTargetKcalPlansRecord
) => {
  await db.insert(targetKcalPlans).values({
    id: InputData.id,
    userId: InputData.userId,
    targetKcal: InputData.targetKcal,
    effectiveDate: InputData.effectiveDate,
  });
};

//Delete user's TargetKcal
export const deleteTargetKcal = async (itemId: string) => {
  await db.delete(targetKcalPlans).where(eq(targetKcalPlans.id, itemId));
};

//Edit user's TargetKcal
export const editTargetKcal = async (
  InputData: InsertTargetKcalPlansRecord
) => {
  await db
    .update(targetKcalPlans)
    .set({
      targetKcal: InputData.targetKcal,
      effectiveDate: InputData.effectiveDate,
      updatedAt: sql`NOW()`,
    })
    .where(eq(targetKcalPlans.id, InputData.id));
};
