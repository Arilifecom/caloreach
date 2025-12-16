"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components/FetchErrorMessage";
import { ReguralrFoodListItem } from "@/app/dashboard/_components/ReguralrFoodListItem";
import { Loading } from "@/components";
import { fetchUserRegularFoods } from "@/utils/db/regularFoods";
import { RegularFoodskeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";

type RegularFoodSelectorProps = {
  userId: string;
  isRegularOpen: boolean;
  handleCloseAllWindows: () => void;
  date: string;
};

export const RegularFoodLsits = ({
  userId,
  handleCloseAllWindows,
  isRegularOpen,
  date,
}: RegularFoodSelectorProps) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: () => fetchUserRegularFoods(userId),
    enabled: isRegularOpen,
    meta: { errCode: TErrCodes.REGULAR_FOOD_SEARCH_FAILED },
  });

  if (isLoading) return <Loading />;
  if (isLoading) return <Loading />;
  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  return (
    <>
      <ul className="px-2 flex flex-wrap gap-2">
        {data && data.length > 0 ? (
          data.map((regularFood) => (
            <ReguralrFoodListItem
              key={regularFood.id}
              regularFood={regularFood}
              handleCloseAllWindows={handleCloseAllWindows}
              date={date}
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
