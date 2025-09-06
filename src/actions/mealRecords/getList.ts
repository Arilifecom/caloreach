"use server";

import { getMealRecords } from "@/db/queries";

const getMealRecordAction = async (userId: string) => {
  const res = await getMealRecords(userId);
  return res;
};

export { getMealRecordAction };
