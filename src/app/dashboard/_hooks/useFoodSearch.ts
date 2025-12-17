"use client";

import { useDebounce } from "@/app/dashboard/_hooks/";
import { foodskeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type searchResultType = {
  id: string;
  foodName: string;
  kcalPer100g: number;
};

export const useFoodSearch = () => {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  //incremental search
  const searchResult = useQuery<searchResultType[]>({
    queryKey: foodskeys.list(debounced),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORIGIN}/api/foods/search?keyword=${debounced}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error("Foods sarch fetch failed");
      }

      return res.json();
    },
    enabled: debounced !== "",
    meta: { errCode: TErrCodes.FOOD_SEARCH_FAILED },
  });

  return {
    query,
    setQuery,
    searchResult,
  };
};
