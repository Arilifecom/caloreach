import { TargetKcalPlanForm } from "@/app/dashboard/target-kcal-plans/_component/TargetKcalPlanForm";
import { Loading } from "@/components";
import { SelectTargetKcalPlansRecord } from "@/db/schema";
import { useModalControl } from "@/hooks";
import { deleteTargetKcal } from "@/utils/api/targetKcal";
import { TargetKcalkeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

type TargetKcalActionMenuProps = {
  targetKcal: SelectTargetKcalPlansRecord;
  firstEffectiveDate?: string;
};

const Component = ({
  targetKcal,
  firstEffectiveDate,
}: TargetKcalActionMenuProps) => {
  const {
    isOpen,
    handleOpenChange,
    handleFormOpenChange,
    closeAllWindows,
    isFormOpen,
  } = useModalControl();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (sentData: SelectTargetKcalPlansRecord) => {
      await deleteTargetKcal(sentData.id);
      return targetKcal;
    },
    onSuccess: (_, sentData) => {
      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.list(sentData.userId),
      });
    },
    onError: () => {
      console.log("Error delete targetKcal");
      toast.error("削除に失敗しました");
    },
  });

  const handleDelete = (sentData: SelectTargetKcalPlansRecord) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(sentData);
  };

  return (
    <>
      <button onClick={handleOpenChange}>
        <EllipsisVertical />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleOpenChange} />
          <div className="absolute border-1 rounded-lg  right-0 flex gap-2 z-20 items-center justify-center bg-muted p-6 transition-opacity duration-300">
            <button
              onClick={handleFormOpenChange}
              className="flex items-center bg-foreground w-[44px] h-[44px] p-3 rounded-lg"
            >
              <Pencil className="text-popover" />
            </button>
            <TargetKcalPlanForm
              mode="edit"
              editItem={targetKcal}
              userId={targetKcal.userId}
              isFormOpen={isFormOpen}
              handleFormWindow={handleFormOpenChange}
              handleCloseAllWindows={closeAllWindows}
              firstEffectiveDate={firstEffectiveDate}
            />

            {targetKcal.effectiveDate === firstEffectiveDate ? (
              <div className="bg-muted border-2 flex items-center h-[44px] p-3 w-[44px] rounded-lg opacity-30">
                <Trash2 />
              </div>
            ) : (
              <button
                onClick={() => handleDelete(targetKcal)}
                disabled={deleteMutation.isPending}
                className="bg-muted border-2 flex items-center justify-center h-[44px] p-3 w-[44px] rounded-lg"
              >
                {deleteMutation.isPending ? <Loading /> : <Trash2 />}
              </button>
            )}

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

const TargetKcalActionMenu = memo(Component);
export { TargetKcalActionMenu };
