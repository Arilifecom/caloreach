import { createClientRPC } from "@/lib/createClientRPC";
import { createServerRPC } from "@/lib/createServerRPC";

export const fetchHistroiesClient = async (
  limit: string,
  currentCursor: string,
) => {
  const client = await createClientRPC();

  const res = await client.api.dashboard.histories.$get({
    query: { limit, currentCursor },
  });

  const data = await res.json();
  return data;
};

export const fetchHistroiesServer = async (
  limit: string,
  currentCursor: string,
) => {
  const client = await createServerRPC();
  const res = await client.api.dashboard.histories.$get({
    query: { limit, currentCursor },
  });

  const data = await res.json();
  return data;
};
