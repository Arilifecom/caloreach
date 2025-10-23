"use client";

import { ReguralrFoodListItem } from "@/app/dashboard/regular-foods/_components/";
import { fetchUserRegularFoods } from "@/utils/api/regularFoods";
import { RegularFoodskeys } from "@/utils/tanstack";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo } from "react";

type RegularFoodLsitsProps = {
  userId: string;
};

const Component = ({ userId }: RegularFoodLsitsProps) => {
  const { data } = useSuspenseQuery({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: () => fetchUserRegularFoods(userId),
  });

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
