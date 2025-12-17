"use server";

import { db } from "@/db";
import { InsertTargetKcalPlansRecord, targetKcalPlans } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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
