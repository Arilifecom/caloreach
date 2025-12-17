"use client";

import { DailyKcalSummary } from "@/app/api/histories/route";
import { List, Loading } from "@/components";
import { formatDateWithDay } from "@/utils/format/date";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

type HistoryListItemProps = {
  data: DailyKcalSummary;
};

const Component = ({ data }: HistoryListItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(`/dashboard/histories/${data.date}`);
  };
  return (
    <>
      <li key={data.date} className="mb-2">
        <List>
          <div className="flex items-center justify-between">
            <h3> {formatDateWithDay(new Date(data.date))}</h3>
            <div className="flex items-baseline-last">
              <p className="font-bold text-xl mr-0.5">{data.totalKcal}</p>
              <span className="text-sm">/ {data.targetKcal} kcal</span>
            </div>
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="flex items-center justify-center bg-background w-[44px] h-[44px] p-3 rounded-lg"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <BookOpen className="text-foreground" />
              )}
            </button>
          </div>
        </List>
      </li>
    </>
  );
};

const HistoryListItem = memo(Component);
export { HistoryListItem };
