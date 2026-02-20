"use client";

import { useDebounce } from "@/app/dashboard/_hooks/";
import { foodskeys, TErrCodes } from "@/lib/tanstack";
import { fetchFoodsByQuery } from "@/services/foods";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useFoodSearch = () => {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  //incremental search
  const searchResult = useQuery({
    queryKey: foodskeys.list(debounced),
    queryFn: async () => await fetchFoodsByQuery(debounced),
    enabled: debounced !== "",
    meta: { errCode: TErrCodes.FOOD_SEARCH_FAILED },
  });

  return {
    query,
    setQuery,
    searchResult,
  };
};
