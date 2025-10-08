"use clinent";

import { SelectMealRecord } from "@/db/schema";
import { useToggle } from "@/hooks";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";

type ActionMenuProps = {
  deleteRecord: (itemId: string) => void;
  mealRecord: SelectMealRecord;
};

const Component = ({ deleteRecord, mealRecord }: ActionMenuProps) => {
  const { isOpen, togleOpen } = useToggle();
  return (
    <>
      <button onClick={togleOpen}>
        <EllipsisVertical />
      </button>

      {isOpen && (
        <div className="absolute border-1 rounded-lg  right-0 -top-[190px] flex flex-col gap-2 items-center justify-center bg-muted p-6 transition-opacity duration-300">
          <button className="flex items-center bg-foreground w-[44px] h-[44px] p-3 rounded-lg">
            <Pencil className="text-popover" />
          </button>
          <button
            onClick={() => deleteRecord(mealRecord.id)}
            className="bg-muted border-2 flex items-center h-[44px] p-3 w-[44px] rounded-lg"
          >
            <Trash2 />
          </button>
          <button
            onClick={togleOpen}
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
