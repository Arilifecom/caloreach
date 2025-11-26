import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { PageHeader } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { getUserIdBycheckAuth } from "@/utils/auth";
import { formatDateWithDay } from "@/utils/format";
import { getQueryClient, mealRecordkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const userId = await getUserIdBycheckAuth();
  const queryClient = getQueryClient();
  const { date } = await params;

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, date),
    queryFn: () => fetchUserDailyMealRecords(userId, date),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader
        title={formatDateWithDay(new Date(date))}
        description="過去の食事履歴詳細です"
      />
      <HydrationBoundary state={dehydratedState}>
        <ProgressSection userId={userId} date={date} />
        <MealRecordSection userId={userId} date={date} />
      </HydrationBoundary>
    </>
  );
}
