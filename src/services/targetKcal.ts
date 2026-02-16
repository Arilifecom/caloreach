import { createClientRPC } from "@/lib/createClientRPC";
import { createServerRPC } from "@/lib/createServerRPC";
import { CreateTargetKcalInput, UpdateTargetKcalInput } from "@/shared/types";

//fetch｜Client
export const fetchTargetKcalRecordsClient = async () => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.targetkcalplans.$get();

  const data = await res.json();
  return data.targetkcalRecords;
};

//fetch｜Server
export const fetchTargetKcalRecordsServer = async () => {
  const client = await createServerRPC();
  const res = await client.api.dashboard.targetkcalplans.$get();

  const data = await res.json();
  return data.targetkcalRecords;
};

//Create
export const createTargetKcal = async (InputData: CreateTargetKcalInput) => {
  const clinet = await createClientRPC();
  const res = await clinet.api.dashboard.targetkcalplans.$post({
    json: InputData,
  });

  const data = await res.json();
  return data;
};

//Delete
export const deleteTargetKcal = async (id: string) => {
  const client = await createClientRPC();
  await client.api.dashboard.targetkcalplans[":id"].$delete({
    param: { id },
  });
};

//Update
export const updateTargetKcal = async (InputData: UpdateTargetKcalInput) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.targetkcalplans[":id"].$put({
    param: { id: InputData.id },
    json: InputData,
  });

  const data = await res.json();
  return data;
};
