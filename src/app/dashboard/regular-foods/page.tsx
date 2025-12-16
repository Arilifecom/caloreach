import { RegularFoodSection } from "@/app/dashboard/regular-foods/_components";
import { fetchUserRegularFoods } from "@/utils/server/regularFoods";
import { getUserId } from "@/utils/server/auth";
import { getQueryClient, RegularFoodskeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function RegularFoodsPage() {
  const userId = await getUserId();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: () => fetchUserRegularFoods(userId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <RegularFoodSection userId={userId} />
      </HydrationBoundary>
    </>
  );
}
