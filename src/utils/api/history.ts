"use server";

import { db } from "@/db";
import { mealRecords, targetKcalPlans } from "@/db/schema";
import { sql, desc, and, eq, lte } from "drizzle-orm";

type fetchDailyKcalSummaryProps = {
  userId: string;
  limit: number;
  currentCursor?: string;
};

export async function fetchDailyKcalSummary({
  userId,
  limit,
  currentCursor,
}: fetchDailyKcalSummaryProps) {
  //Get the total daily Kcal intake for each day (limit：7)
  const totalKcalData = await db
    .select({
      date: sql<string>`DATE(${mealRecords.eatenAt})`.as("date"),
      totalKcal: sql<number>`SUM(${mealRecords.kcal})`.as("total_kcal"),
    })
    .from(mealRecords)
    .where(
      sql`
        ${mealRecords.userId} = ${userId}
        ${
          currentCursor
            ? sql`AND DATE(${mealRecords.eatenAt}) < ${currentCursor}`
            : sql``
        }
      `
    )
    .groupBy(sql`DATE(${mealRecords.eatenAt})`)
    .orderBy(desc(sql`DATE(${mealRecords.eatenAt})`))
    .limit(limit);

  if (totalKcalData.length === 0) return { items: [], nextCursor: null };

  //Get targetKcal data for the specified period
  const latestDate = totalKcalData.map((item) => item.date);
  const targetKcalData = await db
    .select({
      date: targetKcalPlans.effectiveDate,
      targetKcal: targetKcalPlans.targetKcal,
    })
    .from(targetKcalPlans)
    .where(
      and(
        eq(targetKcalPlans.userId, userId),
        lte(targetKcalPlans.effectiveDate, latestDate[0])
      )
    )
    .orderBy(desc(targetKcalPlans.effectiveDate));

  const result = totalKcalData.map((dailyRecord) => {
    //Get the most recent targetKcal on or before the dailyRecord date
    const dailyTarget = targetKcalData.find(
      (targetRecord) => targetRecord.date <= dailyRecord.date
    );

    const dailySummary = {
      userId,
      date: dailyRecord.date,
      totalKcal: dailyRecord.totalKcal,
      targetKcal: dailyTarget?.targetKcal ?? 0,
    };

    return dailySummary;
  });

  //Next Cursor
  const nextCursor =
    result.length === limit ? result[result.length - 1].date : null;

  //hasNext
  const hasNext = result.length === limit;

  // hasPrev
  const hasPrev = !!currentCursor;

  return { items: result, nextCursor, hasNext, hasPrev };
}
