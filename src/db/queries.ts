import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { eq } from "drizzle-orm";

//GET
export async function getMealRecords(userId: string) {
  const res = await db.query.mealRecords.findMany({
    where: eq(mealRecords.userId, userId),
  });
  return res;
}
