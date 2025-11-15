"use server";

import { db } from "@/db";
import {
  InsertProfileRecord,
  InsertTargetKcalPlansRecord,
  profiles,
  targetKcalPlans,
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
}: InsertTargetKcalPlansRecord) {
  return await db.insert(targetKcalPlans).values({
    id: id,
    userId: userId,
    targetKcal: targetKcal,
    effectiveDate: effectiveDate,
  });
}
