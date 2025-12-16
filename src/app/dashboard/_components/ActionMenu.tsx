import { MealRecordForm } from "@/app/dashboard/_components";
import { Loading } from "@/components";
import { SelectMealRecord } from "@/db/schema";
import { useModalControl } from "@/hooks";
import { deleteMealRecord } from "@/utils/server/mealRecords";
import { formatYYMMDD } from "@/utils/format/date";
import { historieskeys, mealRecordkeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

type ActionMenuProps = {
  mealRecord: SelectMealRecord;
};

const Component = ({ mealRecord }: ActionMenuProps) => {
  const editDate = formatYYMMDD(mealRecord.eatenAt);

  const {
    isOpen,
    handleOpenChange,
    handleFormOpenChange,
    closeAllWindows,
    isFormOpen,
  } = useModalControl();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (mealRecord: SelectMealRecord) => {
      await deleteMealRecord(mealRecord);
      return mealRecord;
    },
    onSuccess: (_, mealRecord) => {
      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(
          mealRecord.userId,
          formatYYMMDD(mealRecord.eatenAt)
        ),
      });
      queryClient.invalidateQueries({
        queryKey: historieskeys.list(mealRecord.userId),
      });
      handleOpenChange();
    },
    onError: () => {
      console.log("Error delete mealRecord");
      toast.error("削除に失敗しました");
    },
  });

  const handleDelete = (mealRecord: SelectMealRecord) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(mealRecord);
  };

  return (
    <>
      <button onClick={handleOpenChange}>
        <EllipsisVertical />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleOpenChange} />
          <div className="absolute border-1 rounded-lg  right-0 -top-4 flex gap-2 z-20 items-center justify-center bg-muted p-6 transition-opacity duration-300">
            <button
              onClick={handleFormOpenChange}
              className="flex items-center bg-foreground w-[44px] h-[44px] p-3 rounded-lg"
            >
              <Pencil className="text-popover" />
            </button>
            <MealRecordForm
              mode="edit"
              editItem={mealRecord}
              userId={mealRecord.id}
              isFormOpen={isFormOpen}
              handleFormWindow={handleFormOpenChange}
              handleCloseAllWindows={closeAllWindows}
              date={editDate}
            />
            <button
              onClick={() => handleDelete(mealRecord)}
              disabled={deleteMutation.isPending}
              className="bg-muted border-2 flex items-center justify-center h-[44px] p-3 w-[44px] rounded-lg"
            >
              {deleteMutation.isPending ? <Loading /> : <Trash2 />}
            </button>
            <button
              onClick={handleOpenChange}
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
