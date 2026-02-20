import { RegularFoodSection } from "@/app/dashboard/regular-foods/_components";
import { getQueryClient, RegularFoodskeys } from "@/lib/tanstack";
import { fetchRegularFoodsServer } from "@/services/regularFoods";
import { getUserId } from "@/utils/db/auth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function RegularFoodsPage() {
  const userId = await getUserId();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: RegularFoodskeys.list(userId),
    queryFn: async () => await fetchRegularFoodsServer(),
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
