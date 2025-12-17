import { List } from "@/components";

export const RegularFoodListitemSkeltone = () => (
  <li className="mb-2 text-sm animate-pulse">
    <List className="min-h-14">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3">
          {/* FoodName */}
          <div>
            <div className="h-5 w-[93px] bg-gray-300 rounded" />
            {/* gram・ kcal */}
            <div className="w-24 h-4  bg-gray-300 rounded" />
          </div>
        </div>
        {/* Action menu */}
        <div className="h-9 w-6 bg-gray-300 rounded" />
      </div>
    </List>
  </li>
);
