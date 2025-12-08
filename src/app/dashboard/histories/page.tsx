import { HistoryList } from "@/app/dashboard/histories/_components";
import { PageHeader } from "@/components";
import { fetchDailyKcalSummary } from "@/utils/api/history";
import { getUserId } from "@/utils/auth";
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
      <PageHeader
        title="過去の食事記録"
        description="日ごとの合計カロリーを一覧で確認できます。入力漏れの追加・修正は、各日の詳細ページで行えます。"
      />
      <HydrationBoundary state={dehydratedState}>
        <HistoryList userId={userId} limit={limit} />
      </HydrationBoundary>
    </>
  );
}
