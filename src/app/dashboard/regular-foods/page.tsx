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
        title="レギュラーフード"
        description="よく食べるメニューを登録して、記録をもっと素早く。既定の量・カロリーを保存できます。"
      />
      <HydrationBoundary state={dehydratedState}>
        <RegularFoodSection userId={userId} />
      </HydrationBoundary>
    </>
  );
}
