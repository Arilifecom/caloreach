"use server";

import { db } from "@/db";
import { targetKcalHistory } from "@/db/schema";
import { and, desc, eq, lte } from "drizzle-orm";

//get Current effective user targetKcal
export const getEfeectiveTargetKcal = async (userId: string, date: string) => {
  const res = await db.query.targetKcalHistory.findFirst({
    where: and(
      eq(targetKcalHistory.userId, userId),
      lte(targetKcalHistory.effectiveDate, date)
    ),
    orderBy: desc(targetKcalHistory.effectiveDate),
  });

  return res!.targetKcal;
};
