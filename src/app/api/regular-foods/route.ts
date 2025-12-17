import { db } from "@/db";
import { regularFoods } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const regularFoodsLists = await db.query.regularFoods.findMany({
    where: eq(regularFoods.userId, userId),
    orderBy: [asc(regularFoods.createdAt), asc(regularFoods.id)],
  });

  return NextResponse.json(regularFoodsLists);
}
