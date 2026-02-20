import { createClientRPC } from "@/lib/createClientRPC";
import { createServerRPC } from "@/lib/createServerRPC";
import { RegularFoodsRequest } from "@/shared/types";

//fetch
export const fetchRegularFoodsClient = async () => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.regularfoods.$get();
  const data = await res.json();
  return data.mealRecords;
};

export const fetchRegularFoodsServer = async () => {
  const client = await createServerRPC();
  const res = await client.api.dashboard.regularfoods.$get();
  const data = await res.json();
  return data.mealRecords;
};

//Insert
export const addRegularFood = async (InputData: RegularFoodsRequest) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.regularfoods.$post({
    json: InputData,
  });

  const { data } = await res.json();
  return data;
};

//Delete
export const deleteRegularFood = async (InputData: RegularFoodsRequest) => {
  const client = await createClientRPC();
  await client.api.dashboard.regularfoods[":id"].$delete({
    param: { id: InputData.id },
  });
};

//Update
export const editRegularFood = async (InputData: RegularFoodsRequest) => {
  const client = await createClientRPC();
  const res = await client.api.dashboard.regularfoods[":id"].$put({
    param: { id: InputData.id },
    json: InputData,
  });

  const { data } = await res.json();
  return data;
};
