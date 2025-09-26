import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getProfileByUserId } from "@/utils/api/profile";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/app";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      // get user id
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }
      const userId = user.id;

      // check profile data
      const profile = await getProfileByUserId(userId);

      //if no profile data, redirect to /setup/step-1-user-profile
      const redirectPath =
        !profile || !profile.userName ? "/setup/step-1-user-profile" : next;

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`);
      }

      return NextResponse.redirect(`${origin}${redirectPath}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
