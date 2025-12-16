import { HistoryList } from "@/app/dashboard/histories/_components";
import { fetchDailyKcalSummary } from "@/utils/server/history";
import { getUserId } from "@/utils/server/auth";
import { getQueryClient, historieskeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HistoryPage() {
  const userId = await getUserId();
  const queryClient = getQueryClient();
  const limit = 7;

  await queryClient.prefetchQuery({
    queryKey: historieskeys.list(userId),
    queryFn: () =>
      fetchDailyKcalSummary({ userId, limit, currentCursor: null }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <HistoryList userId={userId} limit={limit} />
      </HydrationBoundary>
    </>
  );
}
