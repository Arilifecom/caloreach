import * as React from "react";
import { EllipsisVertical } from "lucide-react";
import { memo } from "react";

import { cn } from "@/lib/utils";

function Component({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative w-full bg-card text-card-foreground flex items-center justify-between rounded-lg border-2 border-foreground gap-2 px-4 py-2",
        className
      )}
      {...props}
    >
      <div className="flex flex-col">{children}</div>
      <button>
        <EllipsisVertical />
      </button>
      <div className="absolute top-1 -right-1.5 -z-10 w-[100%] h-[101%] rounded-lg bg-foreground" />
    </div>
  );
}

const List = memo(Component);
export { List };
