"use client";

import { InsertMealRecord, SelectMealRecord } from "@/db/schema";
import {
  addMealRecord,
  deleteMealRecord,
  getMealRecordByUserId,
} from "@/utils/api/mealRecords";
import { useCallback, useEffect, useState } from "react";

export function useMealRecords(userId: string, date: Date) {
  const [mealRecords, setMealRecords] = useState<SelectMealRecord[] | null>(
    null
  );

  const fetchLists = useCallback(async () => {
    const data = await getMealRecordByUserId(userId, date);
    setMealRecords(data);
  }, []);

  const addRecord = useCallback(async (InputData: InsertMealRecord) => {
    await addMealRecord(InputData);
    fetchLists();
  }, []);

  const deleteRecord = useCallback(async (id: string) => {
    await deleteMealRecord(id);
    fetchLists();
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return { mealRecords, setMealRecords, addRecord, deleteRecord };
}
