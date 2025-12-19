import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const ERROR_REDIRECT = `${process.env.NEXT_PUBLIC_ORIGIN}/auth/auth-code-error`;
  const SUCCESS_REDIRECT = `${process.env.NEXT_PUBLIC_ORIGIN}/auth/forgot-password/update-password/`;

  if (!code) {
    return NextResponse.redirect(ERROR_REDIRECT);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(ERROR_REDIRECT);
  }

  return NextResponse.redirect(SUCCESS_REDIRECT);
}
