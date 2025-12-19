"use client";

import { FetchErrorMessage } from "@/app/dashboard/_components/FetchErrorMessage";
import { ReguralrFoodListItem } from "@/app/dashboard/_components/ReguralrFoodListItem";
import { List, Loading } from "@/components";
import { Button } from "@/components/ui";
import { SelectregularFood } from "@/db/schema";
import { RegularFoodskeys, TErrCodes } from "@/utils/tanstack";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
          <List className="mx-auto max-w-80">
            <div className="flex flex-col gap-4 items-center px-4 py-2">
              <p>
                よく食べるレギュラーフードを登録すると、ここから選択できるようになります。
              </p>

              <Button
                onClick={() => router.push("/dashboard/regular-foods")}
                className="mx-auto"
              >
                登録ページへ
              </Button>
            </div>
          </List>
        )}
      </ul>
    </>
  );
};
