import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

// Format Paragraph
const formatParagraph = (text: string | undefined) => {
  if (!text) return null;

  const lines = text
    .split(/(?<=。)/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line, index) => <p key={index}>{line}</p>);
};

function Component({ title, description, className }: PageHeaderProps) {
  return (
    <CardHeader className={cn("w-full px-0", className)}>
      <div>
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
        <CardDescription>{formatParagraph(description)}</CardDescription>
      </div>
    </CardHeader>
  );
}

const PageHeader = memo(Component);
export { PageHeader };
