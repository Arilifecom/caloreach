"use client";

import { memo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HistoryListItem } from "@/app/dashboard/histories/_components/HistoryListItem";
import { Button } from "@/components/ui";
import {
  DailyKcalSummaryResponse,
  fetchDailyKcalSummary,
} from "@/utils/api/history";
import { historieskeys, TErrCodes } from "@/utils/tanstack";
import { Loading } from "@/components";
import { FetchErrorMessage } from "@/app/dashboard/_components";
import { toast } from "sonner";

type HistoryListProps = {
  userId: string;
  limit: number;
};

const Component = ({ userId, limit }: HistoryListProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: historieskeys.list(userId),
    queryFn: () =>
      fetchDailyKcalSummary({
        userId,
        limit,
        currentCursor: null,
      }),
    meta: { errCode: TErrCodes.HISTORY_FETCH_FAILED },
  });

  const { items = [], nextCursor = null, hasNext = false } = data ?? {};

  if (isLoading) return <Loading />;
  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  const fetchMore = async () => {
    try {
      const res = await fetchDailyKcalSummary({
        userId,
        limit,
        currentCursor: nextCursor,
      });

      queryClient.setQueryData(
        historieskeys.list(userId),
        (prevData: DailyKcalSummaryResponse) => ({
          items: [...(prevData?.items || []), ...res.items],
          nextCursor: res.nextCursor,
          hasNext: res.hasNext,
        })
      );
    } catch {
      console.error("Error fetch regularFood");
      toast.error("履歴データの取得に失敗しました");
    }
  };

  return (
    <>
      {items && items.length === 0 ? (
        <p className="font-medium text-center mb-4">履歴はありません</p>
      ) : (
        <>
          <ul className="w-full">
            {items.map((item) => (
              <HistoryListItem key={item.date} data={item} />
            ))}
          </ul>
          {hasNext ? (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full my-4 gap-2">
              <div className="col-1 border-t" />
              <Button variant="outline" onClick={() => fetchMore()}>
                Load more
              </Button>
              <div className="col-3 border-t" />
            </div>
          ) : (
            <p className="font-medium text-center">全ての履歴を表示しました</p>
          )}
        </>
      )}
    </>
  );
};

const HistoryList = memo(Component);
export { HistoryList };
