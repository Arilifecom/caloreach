"use client";

import { memo, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { HistoryListItem } from "@/app/dashboard/histories/_components/HistoryListItem";
import { Button } from "@/components/ui";
import { Loading } from "@/components";
import { FetchErrorMessage } from "@/app/dashboard/_components";
import { toast } from "sonner";
import { historieskeys, TErrCodes } from "@/lib/tanstack";
import { HistoriesResponse } from "@/shared/types";
import { fetchHistroiesClient } from "@/services/histories";

type HistoryListProps = {
  userId: string;
  limit: string;
  date: string;
};

const Component = ({ userId, limit, date }: HistoryListProps) => {
  const queryClient = useQueryClient();
  const [fetchMoreLoading, setfetchMoreLoading] = useState(false);

  const { data, isError, refetch } = useSuspenseQuery({
    queryKey: historieskeys.list(userId),
    queryFn: async () => await fetchHistroiesClient(limit, date),
    meta: { errCode: TErrCodes.HISTORY_FETCH_FAILED },
  });

  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  const nextCursor = data ? data.nextCursor : null;

  const fetchMore = async () => {
    if (!nextCursor) return;

    try {
      setfetchMoreLoading(true);
      const data = await fetchHistroiesClient(limit, nextCursor);

      queryClient.setQueryData(
        historieskeys.list(userId),
        (prevData: HistoriesResponse) => ({
          ...prevData,
          historiesRecord: [
            ...(prevData?.historiesRecord || []),
            ...data.historiesRecord,
          ],
          nextCursor: data.nextCursor,
          hasNext: data.hasNext,
        }),
      );
    } catch {
      setfetchMoreLoading(false);
      console.error("Error fetch regularFood");
      toast.error("履歴データの取得に失敗しました");
    } finally {
      setfetchMoreLoading(false);
    }
  };

  return (
    <>
      {data && data.historiesRecord.length === 0 ? (
        <p className="font-medium text-center mb-4">履歴はありません</p>
      ) : (
        <>
          <ul className="w-full">
            {data?.historiesRecord.map((item) => (
              <HistoryListItem key={item.date} data={item} />
            ))}
          </ul>
          {data?.hasNext ? (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full my-4 gap-2">
              <div className="col-1 border-t" />
              <Button
                variant="outline"
                onClick={() => fetchMore()}
                disabled={fetchMoreLoading}
              >
                {fetchMoreLoading ? <Loading /> : "Load more"}
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
