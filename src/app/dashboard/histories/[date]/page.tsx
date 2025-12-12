import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { PageHeader } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { getUserId } from "@/utils/auth";
import { formatDateWithDay } from "@/utils/format/date";
import { getQueryClient, mealRecordkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ recordDate: string }>;
}) {
  const userId = await getUserId();
  const queryClient = getQueryClient();
  const { recordDate } = await params;

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, recordDate),
    queryFn: () => fetchUserDailyMealRecords(userId, recordDate),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader
        title={formatDateWithDay(new Date(recordDate))}
        description="過去の食事履歴の詳細です。"
      />
      <HydrationBoundary state={dehydratedState}>
        <ProgressSection userId={userId} recordDate={recordDate} />
        <MealRecordSection userId={userId} recordDate={recordDate} />
      </HydrationBoundary>
    </>
  );
}
