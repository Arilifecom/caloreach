"use client";

import { useDebounce } from "@/app/dashboard/_hooks/";
import { fetchFoodsBySearch } from "@/utils/db/mealRecords";
import { foodskeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useFoodSearch = () => {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  //incremental search
  const searchResult = useQuery({
    queryKey: foodskeys.list(debounced),
    queryFn: () => fetchFoodsBySearch(debounced),
    enabled: debounced !== "",
    meta: { errCode: TErrCodes.FOOD_SEARCH_FAILED },
  });

  return {
    query,
    setQuery,
    searchResult,
  };
};
