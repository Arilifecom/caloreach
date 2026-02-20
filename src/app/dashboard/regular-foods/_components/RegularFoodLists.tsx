"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components";
import { ReguralrFoodListItem } from "@/app/dashboard/regular-foods/_components/";
import { RegularFoodskeys, TErrCodes } from "@/lib/tanstack";
import { fetchRegularFoodsClient } from "@/services/regularFoods";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo } from "react";

type RegularFoodLsitsProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodLsitsProps) => {
  const { data, isError, refetch } = useSuspenseQuery({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: async () => await fetchRegularFoodsClient(),
    meta: { errCode: TErrCodes.REGULAR_FOOD_SEARCH_FAILED },
  });

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
