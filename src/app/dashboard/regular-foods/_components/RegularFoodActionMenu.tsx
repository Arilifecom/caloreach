import { RegularFoodForm } from "@/app/dashboard/regular-foods/_components/";
import { Loading } from "@/components";
import { SelectregularFood } from "@/db/schema";
import { useModalControl } from "@/hooks";
import { deleteRegularFood } from "@/utils/server/regularFoods";
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
            <RegularFoodForm
              mode="edit"
              editItem={regularFood}
              userId={regularFood.id}
              isFormOpen={isFormOpen}
              handleFormWindow={handleFormOpenChange}
              handleCloseAllWindows={closeAllWindows}
            />
            <button
              onClick={() => handleDelete(regularFood)}
              disabled={deleteMutation.isPending}
              className="bg-muted border-2 flex items-center justify-center h-[44px] p-3 w-[44px] rounded-lg"
            >
              {deleteMutation.isPending ? <Loading /> : <Trash2 />}
            </button>
            <button
              onClick={handleOpenChange}
              className="bg-muted border-2 flex items-center justify-center h-[44px] p-3 w-[44px] rounded-lg"
            >
              <X />
            </button>
          </div>
        </>
      )}
    </>
  );
};

const RegularFoodActionMenu = memo(Component);
export { RegularFoodActionMenu };
