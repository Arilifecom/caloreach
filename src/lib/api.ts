import { AppType } from "@/backend";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { hc } from "hono/client";

const baseUrl = getBaseUrl();
export const client = hc<AppType>(baseUrl);
