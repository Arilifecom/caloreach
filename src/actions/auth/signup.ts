"use server";

import { createClient } from "@/utils/supabase/server";

type SignupInput = {
  email: string;
  password: string;
};

export async function signup(formData: SignupInput) {
  const supabase = await createClient();
  const email = formData.email;
  const password = formData.password;

  if (!email || !password) return;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    throw new Error("登録に失敗しました");
  }

  return;
}
