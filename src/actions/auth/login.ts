"use server";

import { loginFormInput } from "@/app/auth/_components/_types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: loginFormInput) {
  const supabase = await createClient();
  const email = formData.email;
  const password = formData.password;

  if (!email || !password) return;

  const { error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  redirect("/");
}

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
