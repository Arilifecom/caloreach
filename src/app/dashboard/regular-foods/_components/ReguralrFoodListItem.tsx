import { RegularFoodActionMenu } from "@/app/dashboard/regular-foods/_components/RegularFoodActionMenu";
import { List } from "@/components";
import { SelectregularFood } from "@/db/schema";
import { memo } from "react";

type ReguralrFoodItemProps = {
  regularFood: SelectregularFood;
};

const Component = ({ regularFood }: ReguralrFoodItemProps) => {
  return (
    <>
      <li key={regularFood.id} className="mb-2 text-sm">
        <List>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-sm">{regularFood.foodName}</h3>
                <p className="text-xs">
                  {regularFood.gram}g / {regularFood.kcal}kcal
                </p>
              </div>
            </div>
            <RegularFoodActionMenu regularFood={regularFood} />
          </div>
        </List>
      </li>
    </>
  );
};

const ReguralrFoodListItem = memo(Component);
export { ReguralrFoodListItem };
