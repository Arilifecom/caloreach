"use server";

import { db } from "@/db";
import { regularFoods } from "@/db/schema";
import { eq } from "drizzle-orm";

//Get user regular Foods
export const fetchUserRegularFoods = async (userId: string) => {
  const res = await db.query.regularFoods.findMany({
    where: eq(regularFoods.userId, userId),
  });
  // throw new Error("test");
  return res;
};
