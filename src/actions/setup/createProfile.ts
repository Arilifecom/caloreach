"use server";

import { db } from "@/db";
import { InsertProfileRecord, profiles } from "@/db/schema";

export async function createProfile({ userName, id }: InsertProfileRecord) {
  return await db.insert(profiles).values({
    id: id,
    userName: userName,
  });
}
