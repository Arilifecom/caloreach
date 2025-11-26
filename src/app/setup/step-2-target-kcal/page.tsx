import { TargetKcalForm } from "@/app/setup/_components";
import { getUserIdBycheckAuth } from "@/utils/auth";
import React from "react";

export default async function SetFirstTargetKcal() {
  const userId = await getUserIdBycheckAuth();

  return <TargetKcalForm userId={userId} />;
}
