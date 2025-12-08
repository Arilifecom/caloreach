import { TargetKcalSection } from "@/app/dashboard/target-kcal-plans/_component";
import { PageHeader } from "@/components";
import { fetchUserTargetKcal } from "@/utils/api/targetKcal";
import { getUserId } from "@/utils/auth";
import { getQueryClient, TargetKcalkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function TargetKcalPage() {
  const userId = await getUserId();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: TargetKcalkeys.list(userId),
    queryFn: () => fetchUserTargetKcal(userId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader
        title="目標カロリープラン"
        description="開始日を指定して、増量・減量を設定。無理のない計画で継続を目指しましょう。"
      />
      <HydrationBoundary state={dehydratedState}>
        <TargetKcalSection userId={userId} />
      </HydrationBoundary>
    </>
  );
}
