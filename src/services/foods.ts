import { client } from "@/lib/api";

export const fetchFoodsByQuery = async (q: string) => {
  const res = await client.api.foods.$get({
    query: { q },
  });

  const data = await res.json();
  return data.foods;
};
