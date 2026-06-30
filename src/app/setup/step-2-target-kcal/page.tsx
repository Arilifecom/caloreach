import { TargetKcalForm } from "@/app/setup/_components";
import { getUserId } from "@/utils/db/auth";
import React from "react";

export default async function SetFirstTargetKcal() {
  await getUserId();

  return <TargetKcalForm />;
}
