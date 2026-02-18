"use client";

import { List, Loading } from "@/components";
import { formatTime, formatUtcToJstYYMMDD } from "@/utils/format/date";
import { historieskeys, mealRecordkeys } from "@/lib/tanstack";
import { memo } from "react";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";
import { addMealRecord } from "@/services/mealRecords";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegularFoodsResponse } from "@/shared/types";

type ReguralrFoodItemProps = {
  regularFood: RegularFoodsResponse;
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          data.userId,
          formatUtcToJstYYMMDD(data.eatenAt),
        ),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(data.userId),
      });

      handleCloseAllWindows();
    },

    onError: () => {
      console.error("Error creating mealRecord");
      toast.error("追加に失敗しました");
    },
  });

  //Insert data to meralRecord
  const handleAddMealRecords = (data: RegularFoodsResponse) => {
    const time = formatTime(new Date());
    const eatenAtLocal = `${date}T${time}:00`;
    const local = new Date(eatenAtLocal);
    const utsIso = local.toISOString();

    const sentDate = {
      id: uuidv7(),
      userId: data.userId,
      foodName: data.foodName,
      gram: data.gram,
      kcal: data.kcal,
      eatenAt: utsIso,
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
          <List className="w-fit px-2">
            {addMutation.isPending ? (
              <div className="flex items-center justify-center h-9 min-w-22.5">
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
