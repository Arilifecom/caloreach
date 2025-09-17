"use server";

import { resetPassWordFormInput } from "@/app/auth/_components/_types";
import { createClient } from "@/utils/supabase/server";

export async function resetPassWord(formData: resetPassWordFormInput) {
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
