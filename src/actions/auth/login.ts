"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function loginGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/action/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return;
  }

  if (!data.url) {
    return { error: "No URL returned" };
  }

  redirect(data.url);
}
