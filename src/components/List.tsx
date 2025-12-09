import * as React from "react";
import { memo } from "react";

import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Component: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative w-full bg-card text-card-foreground rounded-lg border-2 border-foreground gap-4 px-4 py-2",
        className
      )}
      {...props}
    >
      <div>{children}</div>
      <div className="absolute top-1 -right-1.5 -z-10 w-[100%] h-[101%] rounded-lg bg-foreground" />
    </div>
  );
};

const List = memo(Component);
export { List };
