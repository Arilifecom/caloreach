import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { and, asc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const date = req.nextUrl.searchParams.get("date");

  if (!userId || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const meals = await db.query.mealRecords.findMany({
    where: and(
      eq(mealRecords.userId, userId),
      sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`
    ),
    orderBy: [asc(mealRecords.eatenAt), asc(mealRecords.id)],
  });

  return NextResponse.json(meals);
}
