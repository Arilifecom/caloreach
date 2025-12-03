import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next =
    searchParams.get("next") ?? "/auth/forgot-password/update-password";

  if (!token_hash || !type) {
    return NextResponse.redirect("/auth/auth-code-error");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash,
    type: type as EmailOtpType,
  });

  if (error) {
    return NextResponse.redirect("/auth/auth-code-error");
  }

  return NextResponse.redirect(next);
}
