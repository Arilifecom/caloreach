import { UserNameForm } from "@/app/setup/_components";
import { getUserId } from "@/utils/server/auth";
import React from "react";

export default async function SetUserProfile() {
  const userId = await getUserId();

  return <UserNameForm userId={userId} />;
}
