"use client";

import { DailyKcalSummary } from "@/app/api/histories/route";
import { List, Loading } from "@/components";
import { Button } from "@/components/ui";
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
            <Button
              size="icon"
              variant="outline"
              aria-label="詳細"
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading />
              ) : (
                <BookOpen className="text-foreground" />
              )}
            </Button>
          </div>
        </List>
      </li>
    </>
  );
};

const HistoryListItem = memo(Component);
export { HistoryListItem };
