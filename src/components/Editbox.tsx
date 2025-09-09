import { Pencil, Trash2, X } from "lucide-react";
import { memo } from "react";

function Component() {
  return (
    <div className="absolute border-1 rounded-lg  right-0 -top-[190px] flex flex-col gap-2 items-center justify-center bg-muted p-6">
      <button className="flex items-center bg-foreground w-[44px] h-[44px] p-3 rounded-lg">
        <Pencil className="text-popover" />
      </button>
      <button className="bg-muted border-2 flex items-center h-[44px] p-3 w-[44px] rounded-lg">
        <Trash2 />
      </button>
      <button className="bg-muted border-2 flex items-center h-[44px] p-3 w-[44px] rounded-lg">
        <X />
      </button>
    </div>
  );
}

const EditBox = memo(Component);

export { EditBox };
