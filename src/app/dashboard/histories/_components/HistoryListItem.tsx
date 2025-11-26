"use client";

import { List } from "@/components";
import { DailyKcalSummary } from "@/utils/api/history";
import { formatDateWithDay } from "@/utils/format";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";

type HistoryListItemProps = {
  data: DailyKcalSummary;
};

const Component = ({ data }: HistoryListItemProps) => {
  const router = useRouter();

  const handleClick = () => {
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
              className="flex items-center bg-background w-[44px] h-[44px] p-3 rounded-lg"
            >
              <BookOpen className="text-foreground" />
            </button>
          </div>
        </List>
      </li>
    </>
  );
};

const HistoryListItem = memo(Component);
export { HistoryListItem };
