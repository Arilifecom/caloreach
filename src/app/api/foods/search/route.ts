import { db } from "@/db";
import { foods } from "@/db/schema";
import { like } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  if (!q) return NextResponse.json([]);

  const result = await db.query.foods.findMany({
    where: like(foods.reading, `%${q}%`),
    limit: 10,
    columns: {
      id: true,
      foodName: true,
      kcalPer100g: true,
    },
  });

  return NextResponse.json(result);
}
