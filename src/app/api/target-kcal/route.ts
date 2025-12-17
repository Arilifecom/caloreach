import { db } from "@/db";
import { targetKcalPlans } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const targetKcal = await db.query.targetKcalPlans.findMany({
    where: eq(targetKcalPlans.userId, userId),
    orderBy: asc(targetKcalPlans.effectiveDate),
  });

  return NextResponse.json(targetKcal);
}
