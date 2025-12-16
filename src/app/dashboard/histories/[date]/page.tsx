import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { PageHeader } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/db/mealRecords";
import { formatDateWithDay } from "@/utils/format/date";
import { getQueryClient, mealRecordkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserId } from "@/utils/db/auth";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const userId = await getUserId();
  const queryClient = getQueryClient();
  const { date: targetDate } = await params;

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, targetDate),
    queryFn: () => fetchUserDailyMealRecords(userId, targetDate),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader
        title={formatDateWithDay(new Date(targetDate))}
        description="過去の食事履歴の詳細です。"
      />
      <HydrationBoundary state={dehydratedState}>
        <ProgressSection userId={userId} targetDate={targetDate} />
        <MealRecordSection userId={userId} targetDate={targetDate} />
      </HydrationBoundary>
    </>
  );
}
