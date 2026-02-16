import {
  TargetKcalListsSkeltone,
  TargetKcalSection,
} from "@/app/dashboard/target-kcal-plans/_component";
import { getQueryClient, TargetKcalkeys } from "@/lib/tanstack";
import { fetchTargetKcalRecordsServer } from "@/services/targetKcal";
import { getUserId } from "@/utils/db/auth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function TargetKcalPage() {
  const userId = await getUserId();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: TargetKcalkeys.list(userId),
    queryFn: fetchTargetKcalRecordsServer,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<TargetKcalListsSkeltone />}>
          <TargetKcalSection userId={userId} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
