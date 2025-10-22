"use client";

import { ReguralrFoodListItem } from "@/app/dashboard/_components/ReguralrFoodListItem";
import { Loading } from "@/components";
import { fetchUserRegularFoods } from "@/utils/api/mealRecords";
import { RegularFoodskeys } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";

type RegularFoodSelectorProps = {
  userId: string;
  isRegularOpen: boolean;
  handleCloseAllWindows: () => void;
};

export const RegularFoodLsits = ({
  userId,
  handleCloseAllWindows,
  isRegularOpen,
}: RegularFoodSelectorProps) => {
  const { data, isLoading } = useQuery({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: () => fetchUserRegularFoods(userId),
    enabled: isRegularOpen,
    throwOnError: true,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <ul className="px-2 flex flex-wrap gap-2">
        {data && data.length > 0 ? (
          data.map((regularFood) => (
            <ReguralrFoodListItem
              key={regularFood.id}
              regularFood={regularFood}
              handleCloseAllWindows={handleCloseAllWindows}
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
