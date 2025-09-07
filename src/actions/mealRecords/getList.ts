"use server";

import { getMealRecords } from "@/db/queries";

const getMealRecordAction = async (userId: string) => {
  return await getMealRecords(userId);
};

export { getMealRecordAction };
