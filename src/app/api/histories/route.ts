import { db } from "@/db";
import { mealRecords, targetKcalPlans } from "@/db/schema";
import { and, desc, eq, lte, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const limitStr = req.nextUrl.searchParams.get("limit");
  const currentCursor = req.nextUrl.searchParams.get("currentCursor");

  if (!userId || !limitStr) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const limit = Number(limitStr);
  if (isNaN(limit)) {
    return NextResponse.json({ error: "Invalid limit" }, { status: 400 });
  }

  //Sum the calories for each day over the 7-day period
  const totalKcalData = await db
    .select({
      date: sql<string>`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo')`.as(
        "date"
      ),
      totalKcal: sql<number>`SUM(${mealRecords.kcal})`.as("total_kcal"),
    })
    .from(mealRecords)
    .where(
      and(
        eq(mealRecords.userId, userId),
        currentCursor
          ? sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') < ${currentCursor}`
          : sql``
      )
    )
    .groupBy(sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo')`)
    .orderBy(desc(sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo')`))
    .limit(limit);

  if (totalKcalData.length === 0) {
    return NextResponse.json({ items: [], nextCursor: null });
  }

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

  return NextResponse.json({ items, nextCursor, hasNext });
}
