import { HistoryList } from "@/app/dashboard/histories/_components";
import { PageHeader } from "@/components";
import { fetchDailyKcalSummary } from "@/utils/api/history";
import { getUserIdBycheckAuth } from "@/utils/auth";
import { getQueryClient, historieskeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HistoryPage() {
  const userId = await getUserIdBycheckAuth();
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
      <PageHeader
        title="過去の食事履歴"
        description="日付ごとに摂取したカロリー合計です。"
      />
      <HydrationBoundary state={dehydratedState}>
        <HistoryList userId={userId} limit={limit} />
      </HydrationBoundary>
    </>
  );
}
