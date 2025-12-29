import { RegularFoodForm } from "@/app/dashboard/regular-foods/_components/";
import { Loading } from "@/components";
import { Button } from "@/components/ui";
import { SelectregularFood } from "@/db/schema";
import { useModalControl } from "@/hooks";
import { deleteRegularFood } from "@/utils/db/regularFoods";
import { RegularFoodskeys } from "@/utils/tanstack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

type ActionMenuProps = {
  regularFood: SelectregularFood;
};

const Component = ({ regularFood }: ActionMenuProps) => {
  const {
    isOpen,
    handleOpenChange,
    handleFormOpenChange,
    closeAllWindows,
    isFormOpen,
  } = useModalControl();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (regularFood: SelectregularFood) => {
      await deleteRegularFood(regularFood.id);
      return regularFood;
    },
    onSuccess: (_, regularFood) => {
      queryClient.invalidateQueries({
        queryKey: RegularFoodskeys.list(regularFood.userId),
      });
    },
    onError: () => {
      console.log("Error delete regularFood");
      toast.error("削除に失敗しました");
    },
  });

  const handleDelete = (regularFood: SelectregularFood) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(regularFood);
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
            <RegularFoodForm
              mode="edit"
              editItem={regularFood}
              userId={regularFood.id}
              isFormOpen={isFormOpen}
              handleFormWindow={handleFormOpenChange}
              handleCloseAllWindows={closeAllWindows}
            />
            <Button
              size="icon"
              variant="destructive"
              aria-label="削除"
              onClick={() => handleDelete(regularFood)}
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

const RegularFoodActionMenu = memo(Component);
export { RegularFoodActionMenu };
