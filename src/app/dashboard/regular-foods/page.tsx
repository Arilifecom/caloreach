import { RegularFoodSection } from "@/app/dashboard/regular-foods/_components";
import { PageHeader } from "@/components";
import { fetchUserRegularFoods } from "@/utils/api/regularFoods";
import { getUserId } from "@/utils/auth";
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
      <PageHeader
        title={"レギュラーフード一覧"}
        description="頻繁に摂取する食事を登録してください"
      />
      <HydrationBoundary state={dehydratedState}>
        <RegularFoodSection userId={userId} />
      </HydrationBoundary>
    </>
  );
}
