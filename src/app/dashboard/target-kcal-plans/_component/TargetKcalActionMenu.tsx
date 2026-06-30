import { TargetKcalPlanForm } from "@/app/dashboard/target-kcal-plans/_component/TargetKcalPlanForm";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { useModalControl } from "@/hooks";
import { historieskeys, TargetKcalkeys } from "@/lib/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { TargetKcalPlansResponse } from "@/shared/types";
import { deleteTargetKcal } from "@/services/targetKcal";

type TargetKcalActionMenuProps = {
  targetKcal: TargetKcalPlansResponse;
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
    mutationFn: (sentData: TargetKcalPlansResponse) =>
      deleteTargetKcal(sentData.id),
    onSuccess: (_, sentData) => {
      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.list(sentData.userId),
      });

      queryClient.invalidateQueries({
        queryKey: TargetKcalkeys.effective(sentData.userId),
      });

      queryClient.invalidateQueries({
        queryKey: historieskeys.list(sentData.userId),
      });
    },
    onError: () => {
      console.log("Error delete targetKcal");
      toast.error("削除に失敗しました");
    },
  });

  const handleDelete = (sentData: TargetKcalPlansResponse) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(sentData);
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
          <div className="absolute border rounded-lg  right-0 flex gap-2 z-20 items-center justify-center bg-muted p-6 transition-opacity duration-300">
            <Button
              size="icon"
              variant="dark"
              aria-label="編集"
              onClick={handleFormOpenChange}
            >
              <Pencil className="text-popover" />
            </Button>
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
              <div className="bg-muted border-2 flex items-center h-11 p-3 w-11 rounded-lg opacity-30">
                <Trash2 />
              </div>
            ) : (
              <Button
                size="icon"
                variant="destructive"
                aria-label="削除"
                onClick={() => handleDelete(targetKcal)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? <Loading /> : <Trash2 />}
              </Button>
            )}

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

const TargetKcalActionMenu = memo(Component);
export { TargetKcalActionMenu };
