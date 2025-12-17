import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { and, eq, sql, sum } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const date = req.nextUrl.searchParams.get("date");

  if (!userId || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const [result] = await db
    .select({ totalKcal: sum(mealRecords.kcal) })
    .from(mealRecords)
    .where(
      and(
        eq(mealRecords.userId, userId),
        sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`
      )
    );

  const totalKcal = result?.totalKcal ?? 0;

  return NextResponse.json({ totalKcal });
}
