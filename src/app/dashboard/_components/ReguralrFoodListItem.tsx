import { List, Loading } from "@/components";
import { SelectregularFood } from "@/db/schema";
import { addMealRecord } from "@/utils/db/mealRecords";
import { createJstDate, formatTime, formatYYMMDD } from "@/utils/format/date";
import { historieskeys, mealRecordkeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";

type ReguralrFoodItemProps = {
  regularFood: SelectregularFood;
  handleCloseAllWindows: () => void;
  date: string;
};

const Component = ({
  regularFood,
  handleCloseAllWindows,
  date,
}: ReguralrFoodItemProps) => {
  const queryClient = useQueryClient();
  //AddMutations
  const addMutation = useMutation({
    mutationFn: addMealRecord,
    onSuccess: (_, sentDate) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          sentDate.userId,
          formatYYMMDD(sentDate.eatenAt)
        ),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(sentDate.userId),
      });

      handleCloseAllWindows();
    },
    onError: () => {
      console.error("Error creating mealRecord");
      toast.error("追加に失敗しました");
    },
  });

  //Insert data to meralRecord
  const handleAddMealRecords = (data: SelectregularFood) => {
    const time = formatTime(new Date());
    const eatenAt = createJstDate(date, time);

    const sentDate = {
      ...data,
      id: uuidv7(),
      eatenAt: eatenAt,
    };

    if (addMutation.isPending) return;
    addMutation.mutate(sentDate);
  };

  return (
    <>
      <li key={regularFood.id} className="text-sm">
        <button
          onClick={() => handleAddMealRecords(regularFood)}
          disabled={addMutation.isPending}
        >
          <List className="w-fit">
            {addMutation.isPending ? (
              <div className="flex items-center justify-center h-9 min-w-[90px]">
                <Loading />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-bold text-sm">{regularFood.foodName}</h3>
                  <p className="text-xs">
                    {regularFood.gram}g / {regularFood.kcal}kcal
                  </p>
                </div>
              </div>
            )}
          </List>
        </button>
      </li>
    </>
  );
};

const ReguralrFoodListItem = memo(Component);
export { ReguralrFoodListItem };
