"use server";

import {
  LoginFormInputSchema,
  ResetPassWordInputSchema,
  signupInputSchemaOutput,
} from "@/app/auth/_components/_schema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//Login for mail & password
export async function login(formData: LoginFormInputSchema) {
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
    throw new Error("登録に失敗しました");
  }
}

//Login for Google OAuth
export async function loginGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/auth/callback`,
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

//Sign Up
export async function signup(formData: signupInputSchemaOutput) {
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

//Reset PassWord
export async function resetPassWord(formData: ResetPassWordInputSchema) {
  const supabase = await createClient();
  const email = formData.email;

  if (!email) return;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/auth/reset-password/`,
  });

  if (error) {
    console.error(error);
    throw new Error("メール送信に失敗しました");
  }

  return;
}
