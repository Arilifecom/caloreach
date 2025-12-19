import { db } from "@/db";
import { targetKcalPlans } from "@/db/schema";
import { and, desc, eq, lte } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const date = req.nextUrl.searchParams.get("date");

  if (!userId || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const result = await db.query.targetKcalPlans.findFirst({
    where: and(
      eq(targetKcalPlans.userId, userId),
      lte(targetKcalPlans.effectiveDate, date)
    ),
    orderBy: desc(targetKcalPlans.effectiveDate),
  });

  const targetKcal = result ? result.targetKcal : null;
  return NextResponse.json(targetKcal);
}
