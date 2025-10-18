import { MealRecordForm } from "@/app/dashboard/_components";
import { SelectMealRecord } from "@/db/schema";
import { useWindowControl } from "@/hooks";
import { deleteMealRecord } from "@/utils/api/mealRecords";
import { formatYYMMDD } from "@/utils/format";
import { mealRecordkeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";

type ActionMenuProps = {
  mealRecord: SelectMealRecord;
};

const Component = ({ mealRecord }: ActionMenuProps) => {
  const {
    isOptionOpen,
    handleOptionWindow,
    handleInputFormWindow,
    handleCloseAllWindows,
    isFormOpen,
  } = useWindowControl();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["mealRecord", "delete"],
    mutationFn: async (mealRecord: SelectMealRecord) => {
      deleteMealRecord(mealRecord.id);
      return mealRecord;
    },
    onSuccess: (_, mealRecord) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          mealRecord.userId,
          formatYYMMDD(mealRecord.eatenAt)
        ),
      });
      handleOptionWindow();
    },
    onError: () => {
      console.log("Error delete mealRecord");
    },
  });

  const handleDelete = (mealRecord: SelectMealRecord) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(mealRecord);
  };

  return (
    <>
      <button onClick={handleOptionWindow}>
        <EllipsisVertical />
      </button>

      {isOptionOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleOptionWindow} />
          <div className="absolute border-1 rounded-lg  right-0 -top-[190px] flex flex-col gap-2 z-20 items-center justify-center bg-muted p-6 transition-opacity duration-300">
            <button
              onClick={handleInputFormWindow}
              className="flex items-center bg-foreground w-[44px] h-[44px] p-3 rounded-lg"
            >
              <Pencil className="text-popover" />
            </button>
            <MealRecordForm
              mode="edit"
              editItem={mealRecord}
              userId={mealRecord.id}
              isFormOpen={isFormOpen}
              handleInputFormWindow={handleInputFormWindow}
              handleCloseAllWindows={handleCloseAllWindows}
            />
            <button
              onClick={() => handleDelete(mealRecord)}
              className="bg-muted border-2 flex items-center h-[44px] p-3 w-[44px] rounded-lg"
            >
              <Trash2 />
            </button>
            <button
              onClick={handleOptionWindow}
              className="bg-muted border-2 flex items-center h-[44px] p-3 w-[44px] rounded-lg"
            >
              <X />
            </button>
          </div>
        </>
      )}
    </>
  );
};

const ActionMenu = memo(Component);
export { ActionMenu };
