"use server";

import { db } from "@/db";
import { InsertTargetKcalPlansRecord, targetKcalPlans } from "@/db/schema";
import { and, asc, desc, eq, lte, sql } from "drizzle-orm";

//fetch user targetKcal
export const fetchUserTargetKcal = async (userId: string) => {
  const res = await db.query.targetKcalPlans.findMany({
    where: eq(targetKcalPlans.userId, userId),
    orderBy: asc(targetKcalPlans.effectiveDate),
  });
  return res;
};

//get Current effective user targetKcal
export const getEfeectiveTargetKcal = async (userId: string, date: string) => {
  const res = await db.query.targetKcalPlans.findFirst({
    where: and(
      eq(targetKcalPlans.userId, userId),
      lte(targetKcalPlans.effectiveDate, date)
    ),
    orderBy: desc(targetKcalPlans.effectiveDate),
  });

  return res!.targetKcal;
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
