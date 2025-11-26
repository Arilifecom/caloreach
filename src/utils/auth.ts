import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//Check JWT auth and get userId
export const getUserIdBycheckAuth = async () => {
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
