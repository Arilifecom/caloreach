import { authenticated, getUserId } from "@/actions/auth";
import { UserNameForm } from "@/app/setup/_components";
import React from "react";

export default async function SetUserProfile() {
  await authenticated();
  const userId = await getUserId();

  return <UserNameForm userId={userId} />;
}
