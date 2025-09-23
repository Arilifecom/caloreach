import { UserNameForm } from "@/app/setup/_components";
import { checkAuth, getUser } from "@/utils/auth";
import React from "react";

export default async function SetUserProfile() {
  await checkAuth();
  const userId = await getUser();

  return <UserNameForm userId={userId} />;
}
