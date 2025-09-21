import { authenticated, getUserId } from "@/actions/auth";
import { TargetKcalForm } from "@/app/setup/_components";
import React from "react";

export default async function SetFirstTargetKcal() {
  await authenticated();
  const userId = await getUserId();

  return <TargetKcalForm userId={userId} />;
}
