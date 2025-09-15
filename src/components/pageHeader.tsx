import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

function Component({ title, description, className }: PageHeaderProps) {
  return (
    <CardHeader className={cn("w-full px-0", className)}>
      <div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  );
}

const PageHeader = memo(Component);
export { PageHeader };
