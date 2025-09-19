"use server";

import { db } from "@/db";
import { InsertTargetKcalHistoryRecord, targetKcalHistory } from "@/db/schema";

export async function createTargetKcal({
  id,
  userId,
  targetKcal,
  effectiveDate,
}: InsertTargetKcalHistoryRecord) {
  return await db.insert(targetKcalHistory).values({
    id: id,
    userId: userId,
    targetKcal: targetKcal,
    effectiveDate: effectiveDate,
  });
}
