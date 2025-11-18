import { HistoryList } from "@/app/dashboard/histories/_components";
import { Loading, PageHeader } from "@/components";
import { fetchDailyKcalSummary } from "@/utils/api/history";
import { checkAuth, getUser } from "@/utils/auth";
import { Suspense } from "react";

type HistoryPageProps = {
  searchParams: Promise<{
    currentCursor?: string;
  }>;
};

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  await checkAuth();
  const userId = await getUser();
  const limit = 7;
  const { currentCursor } = await searchParams;

  const { items, nextCursor, hasNext, hasPrev } = await fetchDailyKcalSummary({
    userId: userId,
    limit: limit,
    currentCursor,
  });

  return (
    <>
      <PageHeader
        title="過去の食事履歴"
        description="日付ごとに摂取したカロリー合計です。"
      />
      <Suspense fallback={<Loading />}>
        <HistoryList
          DailyKcalSummaryList={items}
          nextCursor={nextCursor}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </Suspense>
    </>
  );
}
