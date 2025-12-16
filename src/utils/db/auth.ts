"use server";

import {
  LoginFormInputSchema,
  signupInputSchemaOutput,
} from "@/app/auth/_components/_schema";
import {
  NewPassWordInputSchema,
  ResetPassWordInputSchema,
} from "@/app/auth/forgot-password/_schema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//Check JWT auth and get userId
export const getUserId = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    console.error(
      "Authentication failed via getClaims:",
      error?.message || "No claims data"
    );
    redirect("/auth/login");
  }

  const userId = data.claims.sub;
  return userId;
};

//check auth “カロリーチをはじめる” button on the Home landing page.
export const checkAuthClient = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    return false;
  }

  return true;
};

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

//Sign out
export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("サインアウトに失敗しました", error);
    return;
  }
};

//Reset PassWord
export const resetPassWord = async (formData: ResetPassWordInputSchema) => {
  const supabase = await createClient();
  const email = formData.email;

  if (!email) return;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/auth/forgot-password/update-password`,
  });

  if (error) {
    console.error(error);
    throw new Error("メール送信に失敗しました");
  }

  return;
};

//Upadate NewPassWord
export const updateNewPassWord = async (formData: NewPassWordInputSchema) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    console.error(error);
  }

  return;
};
