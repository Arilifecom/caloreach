"use server";

import { AppType } from "@/backend";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";
import { hc } from "hono/client";

export async function createServerRPC() {
  const supabase = await createClient();
  const baseUrl = getBaseUrl();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    return hc<AppType>(baseUrl);
  }

  return hc<AppType>(baseUrl, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });
}
