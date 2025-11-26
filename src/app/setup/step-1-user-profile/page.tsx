import { UserNameForm } from "@/app/setup/_components";
import { getUserIdBycheckAuth } from "@/utils/auth";
import React from "react";

export default async function SetUserProfile() {
  const userId = await getUserIdBycheckAuth();

  return <UserNameForm userId={userId} />;
}
