import { createClientRPC } from "@/lib/createClientRPC";
import { MealRecordRequest } from "@/shared/types/";

//fetch
export const fetchMealRecords = async (date: string) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.mealrecords.$get({
    query: { date },
  });
  const data = await res.json();
  return data.mealRecords;
};

//Insert
export const addMealRecord = async (InputData: MealRecordRequest) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.mealrecords.$post({
    json: InputData,
  });

  const { data } = await res.json();
  return data;
};

//Update
export const updateMealRecord = async (InputData: MealRecordRequest) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.mealrecords[":id"].$put({
    param: { id: InputData.id },
    json: InputData,
  });

  const { data } = await res.json();
  return data;
};

//Delete
export const deleteMealRecord = async (InputData: MealRecordRequest) => {
  const client = await createClientRPC();
  await client.api.dashboard.mealrecords[":id"].$delete({
    param: { id: InputData.id },
  });
};

//GET | 対象の日付の合計Kcal取得
export const getDailyTotalKcal = async (date: string) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.mealrecords.totalkcal.$get({
    query: { date },
  });
  const data = await res.json();
  return data.totalKcal;
};
