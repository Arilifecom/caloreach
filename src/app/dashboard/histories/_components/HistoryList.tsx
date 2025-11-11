// app/dashboard/history/_components/HistoryList.tsx (Client Component)
"use client";

import { HistoryListItem } from "@/app/dashboard/histories/_components/HistoryListItem";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { getDailyKcalSummary } from "@/utils/api/history";
import { memo, useState } from "react";

export type DailyKcalSummary = {
  date: string;
  totalKcal: number;
  targetKcal: number;
};

type HistoryListProps = {
  userId: string;
  initialData: DailyKcalSummary[];
};

const Component = ({ initialData, userId }: HistoryListProps) => {
  const [data, setData] = useState(initialData);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length > 0);

  const loadmore = async () => {
    setLoading(true);
    const nextOffset = offset + 1;

    const nextData = await getDailyKcalSummary({
      userId: userId,
      offset: nextOffset,
      limit: 7,
    });

    setData((prev) => [...prev, ...nextData]);
    setOffset(nextOffset);
    setLoading(false);

    if (nextData.length < 7) {
      setHasMore(false);
    }
  };

  return (
    <>
      {initialData.length === 0 && !loading && (
        <p className="font-medium text-center mb-4">履歴はありません</p>
      )}

      {data.length > 0 && (
        <ul className="w-full">
          {data.map((item) => (
            <HistoryListItem key={item.date} data={item} />
          ))}
        </ul>
      )}

      {loading ? (
        <Loading />
      ) : hasMore && data.length > 0 ? (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full my-4 gap-2">
          <div className="col-1 border-t"></div>
          <Button variant="outline" onClick={loadmore}>
            Lead more
          </Button>
          <div className="col-3 border-t"></div>
        </div>
      ) : (
        <p className="font-medium text-center mb-4">全ての履歴を表示しました</p>
      )}
    </>
  );
};

const HistoryList = memo(Component);
export { HistoryList };
