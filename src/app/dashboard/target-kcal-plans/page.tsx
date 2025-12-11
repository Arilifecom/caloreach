import { TargetKcalSection } from "@/app/dashboard/target-kcal-plans/_component";
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
      <HydrationBoundary state={dehydratedState}>
        <TargetKcalSection userId={userId} />
      </HydrationBoundary>
    </>
  );
}
