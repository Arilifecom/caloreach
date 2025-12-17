"use client";

import { memo, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { HistoryListItem } from "@/app/dashboard/histories/_components/HistoryListItem";
import { Button } from "@/components/ui";
import { historieskeys, TErrCodes } from "@/utils/tanstack";
import { Loading } from "@/components";
import { FetchErrorMessage } from "@/app/dashboard/_components";
import { toast } from "sonner";
import { DailyKcalSummaryResponse } from "@/app/api/histories/route";
import { formatYYMMDD } from "@/utils/format/date";

type HistoryListProps = {
  userId: string;
};

const today = formatYYMMDD(new Date());

const Component = ({ userId }: HistoryListProps) => {
  const queryClient = useQueryClient();
  const [fetchMoreLoading, setfetchMoreLoading] = useState(false);
  const limit = 7;

  const { data, isError, refetch } = useSuspenseQuery<DailyKcalSummaryResponse>(
    {
      queryKey: historieskeys.list(userId),
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ORIGIN}/api/histories?userId=${userId}&limit=${limit}&currentCursor=${today}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error("DailyKcalSummary fetch failed");
        }

        return res.json();
      },
      meta: { errCode: TErrCodes.HISTORY_FETCH_FAILED },
    }
  );

  if (isError) return <FetchErrorMessage onRetry={refetch} />;

  const nextCursor = data ? data.nextCursor : null;

  const fetchMore = async () => {
    try {
      setfetchMoreLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ORIGIN}/api/histories?userId=${userId}&limit=${limit}&currentCursor=${nextCursor}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error("lead more fetch failed");
      }

      const data: DailyKcalSummaryResponse = await res.json();

      queryClient.setQueryData(
        historieskeys.list(userId),
        (prevData: DailyKcalSummaryResponse) => ({
          items: [...(prevData?.items || []), ...data.items],
          nextCursor: data.nextCursor,
          hasNext: data.hasNext,
        })
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
      {data && data.items.length === 0 ? (
        <p className="font-medium text-center mb-4">履歴はありません</p>
      ) : (
        <>
          <ul className="w-full">
            {data?.items.map((item) => (
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
