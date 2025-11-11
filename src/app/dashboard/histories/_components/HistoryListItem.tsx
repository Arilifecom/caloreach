import { DailyKcalSummary } from "@/app/dashboard/histories/_components/HistoryList";
import { List } from "@/components";
import { formatDateWithDay } from "@/utils/format";
import { BookOpen } from "lucide-react";
import { memo } from "react";

type HistoryListItemProps = {
  data: DailyKcalSummary;
};

const Component = ({ data }: HistoryListItemProps) => {
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
              // onClick={ Go to detail Page }
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
