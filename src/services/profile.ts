"use server";

import { createServerRPC } from "@/lib/createServerRPC";
import { CreateProfileInput } from "@/shared/types";

//Get profile
export async function getProfileByUserId() {
  const client = await createServerRPC();
  const res = await client.api.dashboard.profiles.$get();

  const data = await res.json();
  return data.profile;
}

//Create user Name
export async function createProfile(InputData: CreateProfileInput) {
  const client = await createServerRPC();
  const res = await client.api.dashboard.profiles.$post({
    json: InputData,
  });

  const data = await res.json();
  return data;
}
