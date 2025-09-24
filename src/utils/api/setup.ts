"use server";

import { db } from "@/db";
import {
  InsertProfileRecord,
  InsertTargetKcalHistoryRecord,
  profiles,
  targetKcalHistory,
} from "@/db/schema";

//Setup user Name
export async function createProfile({ userName, id }: InsertProfileRecord) {
  return await db.insert(profiles).values({
    id: id,
    userName: userName,
  });
}

//Setup First user's TargetKcal
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
