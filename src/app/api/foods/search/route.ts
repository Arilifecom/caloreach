import { db } from "@/db";
import { foods } from "@/db/schema";
import { like } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword");

  if (!keyword) return NextResponse.json([]);

  const result = await db.query.foods.findMany({
    where: like(foods.reading, `%${keyword}%`),
    limit: 10,
    columns: {
      id: true,
      foodName: true,
      kcalPer100g: true,
    },
  });

  return NextResponse.json(result);
}
