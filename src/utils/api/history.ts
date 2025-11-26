"use server";

import { db } from "@/db";
import { mealRecords, targetKcalPlans } from "@/db/schema";
import { sql, desc, and, eq, lte } from "drizzle-orm";

export type DailyKcalSummary = {
  date: string;
  totalKcal: number;
  targetKcal: number;
};

export type DailyKcalSummaryResponse = {
  items: DailyKcalSummary[];
  nextCursor: string | null;
  hasNext: string | null;
};

type fetchDailyKcalSummaryProps = {
  userId: string;
  limit: number;
  currentCursor: string | null;
};

export async function fetchDailyKcalSummary({
  userId,
  currentCursor,
  limit,
}: fetchDailyKcalSummaryProps) {
  //Sum the calories for each day over the 7-day period
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

  //Get the effective target kcal for that day
  const latestDate = totalKcalData[0].date;

  const targetKcalData = await db
    .select({
      date: targetKcalPlans.effectiveDate,
      targetKcal: targetKcalPlans.targetKcal,
    })
    .from(targetKcalPlans)
    .where(
      and(
        eq(targetKcalPlans.userId, userId),
        lte(targetKcalPlans.effectiveDate, latestDate)
      )
    )
    .orderBy(desc(targetKcalPlans.effectiveDate));

  // Get the targetKcal that applies on each date
  const items = totalKcalData.map((dailyRecord) => {
    const dailyTarget = targetKcalData.find(
      (targetRecord) => targetRecord.date <= dailyRecord.date
    );
    return {
      date: dailyRecord.date,
      totalKcal: dailyRecord.totalKcal,
      targetKcal: dailyTarget?.targetKcal ?? 0,
    };
  });

  //next cursor
  const nextCursor =
    items.length === limit ? items[items.length - 1].date : null;

  //has next
  const hasNext = items.length === limit;

  return { items, nextCursor, hasNext };
}
