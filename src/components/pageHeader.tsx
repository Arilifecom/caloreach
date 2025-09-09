import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

function Component({ title, description }: PageHeaderProps) {
  return (
    <CardHeader className="w-full px-0">
      <div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  );
}

const PageHeader = memo(Component);
export { PageHeader };
