import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { getQueryClient, mealRecordkeys } from "@/lib/tanstack";
import { fetchMealRecordsServer } from "@/services/mealRecords";
import { getUserId } from "@/utils/db/auth";
import { getTodayJST } from "@/utils/format/date";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const userId = await getUserId();
  const queryClient = getQueryClient();
  //yyyy-MM-dd
  const date = getTodayJST();

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, date),
    queryFn: async () => fetchMealRecordsServer(date),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <ProgressSection userId={userId} />
        <MealRecordSection userId={userId} targetDate={date} />
      </HydrationBoundary>
    </>
  );
}
