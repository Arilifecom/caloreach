import { List } from "@/components";

export const MealRecordItemSkeleton = () => (
  <li className="mb-2 text-sm animate-pulse">
    <List>
      <div className="flex w-full justify-between items-center gap-3">
        {/* date */}
        <div className="h-4 w-12 bg-gray-300 rounded" />

        {/* foodName・grams・kcal */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        {/* Action menu */}
        <div className="h-11 w-11 bg-gray-300 rounded" />
      </div>
    </List>
  </li>
);
