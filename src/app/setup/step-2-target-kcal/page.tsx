import { TargetKcalForm } from "@/app/setup/_components";
import { getUserId } from "@/utils/db/auth";
import React from "react";

export default async function SetFirstTargetKcal() {
  const userId = await getUserId();

  return <TargetKcalForm userId={userId} />;
}
