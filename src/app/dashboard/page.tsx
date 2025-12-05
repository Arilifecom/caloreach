import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { PageHeader } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { getUserId } from "@/utils/auth";
import { formatDateWithDay, getToday } from "@/utils/format";
import { getQueryClient, mealRecordkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Dashboard() {
  const userId = await getUserId();
  const queryClient = getQueryClient();

  const today = getToday();
  const displayDate = new Date();

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, today),
    queryFn: () => fetchUserDailyMealRecords(userId, today),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader
        title={formatDateWithDay(displayDate)}
        description="目標達成までがんばろう！"
      />
      <HydrationBoundary state={dehydratedState}>
        <ProgressSection userId={userId} date={today} />
        <MealRecordSection userId={userId} date={today} />
      </HydrationBoundary>
    </>
  );
}
