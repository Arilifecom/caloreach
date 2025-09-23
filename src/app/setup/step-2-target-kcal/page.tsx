import { TargetKcalForm } from "@/app/setup/_components";
import { checkAuth, getUser } from "@/utils/auth";
import React from "react";

export default async function SetFirstTargetKcal() {
  await checkAuth();
  const userId = await getUser();

  return <TargetKcalForm userId={userId} />;
}
