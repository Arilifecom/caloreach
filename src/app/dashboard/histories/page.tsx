import {
  HistoryList,
  HistoryListSkeltone,
} from "@/app/dashboard/histories/_components";
import { getQueryClient, historieskeys } from "@/lib/tanstack";
import { fetchHistroiesServer } from "@/services/histories";
import { getUserId } from "@/utils/db/auth";
import { getTodayJST } from "@/utils/format/date";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function HistoryPage() {
  const userId = await getUserId();
  const queryClient = getQueryClient();
  const limit = "7";
  //yyyy-MM-dd
  const date = getTodayJST();

  await queryClient.prefetchQuery({
    queryKey: historieskeys.list(userId),
    queryFn: async () => await fetchHistroiesServer(limit, date),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<HistoryListSkeltone />}>
          <HistoryList userId={userId} limit={limit} date={date} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
