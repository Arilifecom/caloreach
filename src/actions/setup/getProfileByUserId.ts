"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProfileByUserId(userId: string) {
  const res = await db.query.profiles.findFirst({
    where: eq(profiles.id, userId),
  });

  return res;
}
