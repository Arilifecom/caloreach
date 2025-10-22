import { List } from "@/components";
import { SelectregularFoods } from "@/db/schema";
import { addMealRecord } from "@/utils/api/mealRecords";
import { formatYYMMDD } from "@/utils/format";
import { mealRecordkeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";

type ReguralrFoodItemProps = {
  regularFood: SelectregularFoods;
  handleCloseAllWindows: () => void;
};

const Component = ({
  regularFood,
  handleCloseAllWindows,
}: ReguralrFoodItemProps) => {
  const queryClient = useQueryClient();
  //Mutations
  const addMutation = useMutation({
    mutationFn: addMealRecord,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          sentDate.userId,
          formatYYMMDD(sentDate.eatenAt)
        ),
      });
      handleCloseAllWindows();
    },
    onError: () => {
      console.error("Error creating mealRecord");
      toast.error("追加に失敗しました");
    },
  });

  const handleAddMealRecords = (data: SelectregularFoods) => {
    //Create data for meralRecord
    const sentDate = {
      ...data,
      id: uuidv7(),
      eatenAt: new Date(),
    };

    if (addMutation.isPending) return;
    addMutation.mutate(sentDate);
  };

  return (
    <>
      <li key={regularFood.id} className="text-sm">
        <button onClick={() => handleAddMealRecords(regularFood)}>
          <List className="w-fit">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-sm">{regularFood.foodName}</h3>
                <p className="text-xs">
                  {regularFood.gram}g / {regularFood.kcal}kcal
                </p>
              </div>
            </div>
          </List>
        </button>
      </li>
    </>
  );
};

const ReguralrFoodListItem = memo(Component);
export { ReguralrFoodListItem };
