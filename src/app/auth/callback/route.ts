import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProfileByUserId } from "@/utils/db/profile";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
  const ERROR_REDIRECT = `${ORIGIN}/auth/auth-code-error`;
  const SETUP_REDIRECT = `${ORIGIN}/setup/step-1-user-profile/`;
  const DASHBOARD_REDIRECT = `${ORIGIN}/dashboard`;

  if (!code) {
    return NextResponse.redirect(ERROR_REDIRECT);
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(ERROR_REDIRECT);
  }

  //Check user Profile
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.redirect("/auth/login");

  const userId = user.id;
  const profile = await getProfileByUserId(userId);

  const redirectPath =
    !profile || !profile.userName ? SETUP_REDIRECT : DASHBOARD_REDIRECT;

  return NextResponse.redirect(redirectPath);
}
