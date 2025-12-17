import { List } from "@/components";

export const HistoryListItemSkeltone = () => {
  return (
    <li className="mb-2 animate-pulse">
      <List className="min-h-16">
        <div className="flex w-full justify-between items-center gap-3">
          {/* date */}
          <div className="h-4 w-[88px] bg-gray-300 rounded" />

          {/* totalKcal / targetKcal */}
          <div className="flex w-32 items-baseline-last">
            <div className="h-5 w-12 bg-gray-300 rounded mr-0.5" />
            <span>/</span>
            <div className="h-4 w-[75px] bg-gray-200 rounded"></div>
          </div>

          {/* Action menu */}
          <div className="h-11 w-11 bg-gray-300 rounded" />
        </div>
      </List>
    </li>
  );
};
