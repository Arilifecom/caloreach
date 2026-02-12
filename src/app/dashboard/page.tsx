import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { createServerRPC } from "@/lib/createServerRPC";
import { getQueryClient, mealRecordkeys } from "@/lib/tanstack";
import { getUserId } from "@/utils/db/auth";
import { formatYYMMDD } from "@/utils/format/date";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const userId = await getUserId();
  const queryClient = getQueryClient();
  const date = formatYYMMDD(new Date());

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.dailyList(userId, date),
    queryFn: async () => {
      const client = await createServerRPC();

      const res = await client.api.dashboard.mealrecords.$get({
        query: { date },
      });

      const data = await res.json();
      return data.mealRecords;
    },
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
