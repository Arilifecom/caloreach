"use server";

import { db } from "@/db";
import { mealRecords, targetKcalPlans } from "@/db/schema";
import { sql, desc, and, eq, lte } from "drizzle-orm";

type getDailyKcalSummaryProps = {
  userId: string;
  offset: number;
  limit: number;
};

export async function getDailyKcalSummary({
  userId,
  offset,
  limit,
}: getDailyKcalSummaryProps) {
  //1日ごとの摂取カロリー合計値を7日分取得
  const totalKcalData = await db
    .select({
      date: sql<string>`DATE(${mealRecords.eatenAt})`.as("date"),
      totalKcal: sql<number>`SUM(${mealRecords.kcal})`.as("total_kcal"),
    })
    .from(mealRecords)
    .where(sql`${mealRecords.userId} = ${userId}`)
    .groupBy(sql`DATE(${mealRecords.eatenAt})`)
    .orderBy(desc(sql`DATE(${mealRecords.eatenAt})`))
    .limit(limit)
    .offset(offset * limit);

  //目標摂取カロリー（targetKcalHistory）を取得
  const dates = totalKcalData.map((item) => item.date);
  if (dates.length === 0) return [];

  const targetKcalData = await db
    .select({
      date: targetKcalPlans.effectiveDate,
      targetKcal: targetKcalPlans.targetKcal,
    })
    .from(targetKcalPlans)
    .where(
      and(
        eq(targetKcalPlans.userId, userId),
        lte(targetKcalPlans.effectiveDate, dates[0])
      )
    )
    .orderBy(desc(targetKcalPlans.effectiveDate));

  //各日付の合計データに対応する有効な目標カロリーを紐づけて返す
  const result = totalKcalData.map((dailyRecord) => {
    const target = targetKcalData.find(
      (targetRecord) => targetRecord.date <= dailyRecord.date
    );

    const dailySummary = {
      date: dailyRecord.date,
      totalKcal: dailyRecord.totalKcal,
      targetKcal: target?.targetKcal ?? 0,
    };

    return dailySummary;
  });

  return result;
}
