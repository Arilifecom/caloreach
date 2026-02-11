"use client";

import { AppType } from "@/backend";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/client";
import { hc } from "hono/client";

export async function createClientRPC() {
  const supabase = createClient();
  const baseUrl = getBaseUrl();

  const { data } = await supabase.auth.getClaims();
  if (data?.claims === undefined) {
    return hc<AppType>(baseUrl);
  }

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
