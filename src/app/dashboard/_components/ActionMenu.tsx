import { MealRecordForm } from "@/app/dashboard/_components";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { useModalControl } from "@/hooks";
import { historieskeys, mealRecordkeys } from "@/lib/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { MealRecordResponse } from "@/shared/types/";
import { formatUtcToJstYYMMDD } from "@/utils/format/date";
import { deleteMealRecord } from "@/services/mealRecords";

type ActionMenuProps = {
  mealRecord: MealRecordResponse;
};

const Component = ({ mealRecord }: ActionMenuProps) => {
  const editDate = mealRecord.eatenAt;

  const {
    isOpen,
    handleOpenChange,
    handleFormOpenChange,
    closeAllWindows,
    isFormOpen,
  } = useModalControl();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMealRecord,
    onSuccess: (_, mealRecord) => {
      const userId = mealRecord.userId;
      const date = formatUtcToJstYYMMDD(mealRecord.eatenAt);

      queryClient.invalidateQueries({
        queryKey: mealRecordkeys.dailyList(userId, date),
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

  const handleDelete = (mealRecord: MealRecordResponse) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(mealRecord);
  };

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        aria-label="編集"
        onClick={handleOpenChange}
      >
        <EllipsisVertical />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleOpenChange} />
          <div className="absolute border rounded-lg  right-0 -top-4 flex gap-2 z-20 items-center justify-center bg-muted p-6 transition-opacity duration-300">
            <Button
              size="icon"
              variant="dark"
              aria-label="編集"
              onClick={handleFormOpenChange}
            >
              <Pencil className="text-popover" />
            </Button>
            <MealRecordForm
              mode="edit"
              editItem={mealRecord}
              userId={mealRecord.id}
              isFormOpen={isFormOpen}
              handleFormWindow={handleFormOpenChange}
              handleCloseAllWindows={closeAllWindows}
              date={editDate}
            />
            <Button
              size="icon"
              variant="destructive"
              aria-label="削除"
              onClick={() => handleDelete(mealRecord)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? <Loading /> : <Trash2 />}
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="キャンセル"
              onClick={handleOpenChange}
            >
              <X />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const ActionMenu = memo(Component);
export { ActionMenu };
