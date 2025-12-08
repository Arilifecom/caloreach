import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { PageHeader } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { getUserId } from "@/utils/auth";
import { formatDateWithDay, getToday } from "@/utils/format/date";
import { getQueryClient, mealRecordkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Dashboard() {
  const userId = await getUserId();
  const queryClient = getQueryClient();

  const today = getToday();
  const displayDate = new Date();
  const formatedDisplayDate = formatDateWithDay(displayDate);

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, today),
    queryFn: () => fetchUserDailyMealRecords(userId, today),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageHeader
        title={`今日の食事記録｜ ${formatedDisplayDate} `}
        description={`目標達成までのカロリー進捗を確認しましょう。今日の一歩が習慣になります。`}
      />
      <HydrationBoundary state={dehydratedState}>
        <ProgressSection userId={userId} date={today} />
        <MealRecordSection userId={userId} date={today} />
      </HydrationBoundary>
    </>
  );
}
