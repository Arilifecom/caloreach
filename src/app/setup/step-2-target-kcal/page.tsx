import { TargetKcalForm } from "@/app/setup/_components";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

//Check user session
const authenticated = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    console.error("Error fetching Claims:", error || "no data");

    redirect("/auth/login");
  }
};

//Get user ID
const getUserId = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    console.error("Error fetching Claims:", error || "no data");
    redirect("/auth/login");
  }

  return data.user.id;
};

export default async function SetFirstTargetKcal() {
  await authenticated();
  const userId = await getUserId();

  return <TargetKcalForm userId={userId} />;
}
