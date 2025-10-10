"use clinent";

import { MealRecordForm } from "@/app/dashbord/_components";
import { InsertMealRecord, SelectMealRecord } from "@/db/schema";
import { useWindowControl } from "@/hooks";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";

type ActionMenuProps = {
  mealRecord: SelectMealRecord;
  deleteRecord: (itemId: string) => void;
  editRecord: (inputData: InsertMealRecord) => void;
};

const Component = ({
  mealRecord,
  deleteRecord,
  editRecord,
}: ActionMenuProps) => {
  const {
    isOptionOpen,
    handleOptionWindow,
    handleInputFormWindow,
    handleCloseAllWindows,
    isFormOpen,
  } = useWindowControl();

  return (
    <>
      <button onClick={handleOptionWindow}>
        <EllipsisVertical />
      </button>

      {isOptionOpen && (
        <div className="fixed inset-0 z-10" onClick={handleOptionWindow} />
      )}

      {isOptionOpen && (
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
            handleOptionWindow={handleOptionWindow}
            handleCloseAllWindows={handleCloseAllWindows}
            onSubmit={editRecord}
          />
          <button
            onClick={() => deleteRecord(mealRecord.id)}
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
      )}
    </>
  );
};

const ActionMenu = memo(Component);
export { ActionMenu };
