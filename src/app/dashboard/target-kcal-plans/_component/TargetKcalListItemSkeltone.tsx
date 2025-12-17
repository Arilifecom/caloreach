import { List } from "@/components";

export const TargetKcalListItemSkeltone = () => (
  <li className="mb-2 animate-pulse">
    <List>
      <div className="flex w-full justify-between min-h-[49.5px]">
        <div className="flex items-center gap-6">
          <div className="relative">
            {/* date */}
            <div className="h-8 w-24 bg-gray-300 rounded" />
            <div className="absolute -top-1.5 left-0 h-2 w-10 bg-gray-300 rounded" />
          </div>
          <div className="h-6 w-8 bg-gray-200 rounded" />
          <div className="h-11 w-24 bg-gray-200 rounded" />
        </div>
        {/* Action menu */}
        <div className="h-11 w-11 bg-gray-300 rounded" />
      </div>
    </List>
  </li>
);
