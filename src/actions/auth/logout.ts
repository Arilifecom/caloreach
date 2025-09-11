"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("There has been an error signing out: ", error);
    return;
  }

  return redirect("/auth/login");
}
