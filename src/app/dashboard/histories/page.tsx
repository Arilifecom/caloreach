import { HistoryList } from "@/app/dashboard/histories/_components";
import { PageHeader } from "@/components";
import { getDailyKcalSummary } from "@/utils/api/history";
import { checkAuth, getUser } from "@/utils/auth";

export default async function HistoryPage() {
  await checkAuth();
  const userId = await getUser();

  const initialData = await getDailyKcalSummary({
    userId: userId,
    offset: 0,
    limit: 7,
  });

  return (
    <>
      <PageHeader
        title="過去の食事履歴"
        description="日付ごとに摂取したカロリー合計です。"
      />
      <HistoryList initialData={initialData} userId={userId} />
    </>
  );
}
