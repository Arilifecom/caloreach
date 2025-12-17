"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components";
import { ReguralrFoodListItem } from "@/app/dashboard/regular-foods/_components/";
import { Loading } from "@/components";
import { SelectregularFood } from "@/db/schema";
import { RegularFoodskeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type RegularFoodLsitsProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodLsitsProps) => {
  const { data, isLoading, isError, refetch } = useQuery<SelectregularFood[]>({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORIGIN}/api/regular-foods?userId=${userId}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error("RegularFoods fetch failed");
      }
      return res.json();
    },
    meta: { errCode: TErrCodes.REGULAR_FOOD_SEARCH_FAILED },
  });

  if (isLoading) return <Loading />;
  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  return (
    <>
      <ul className="w-full">
        {data && data.length > 0 ? (
          data.map((regularFood) => (
            <ReguralrFoodListItem
              key={regularFood.id}
              regularFood={regularFood}
            />
          ))
        ) : (
          <p className="font-medium text-center">
            登録されているレギュラーフードはありません
          </p>
        )}
      </ul>
    </>
  );
};

const RegularFoodLists = memo(Component);
export { RegularFoodLists };
