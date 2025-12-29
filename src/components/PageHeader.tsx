import { CardDescription, CardTitle } from "@/components/ui/card";
import { formatParagraph } from "@/utils/format/string";
import { memo } from "react";

type Variant = "small" | "default" | "large";
interface PageHeaderProps {
  /** カードタイトル　*/
  title: string;
  /** 説明文。改行ができます。*/
  description?: string;
  /** タイトルサイズと下の余白調整*/
  variant?: Variant;
}

function Component({
  title,
  description,
  variant = "default",
}: PageHeaderProps) {
  const titleClassMap: Record<Variant, string> = {
    small: "text-lg md:text-xl mb-1",
    default: "text-xl md:text-2xl mb-2",
    large: "text-2xl md:text-3xl mb-3",
  };

  const titleClass = titleClassMap[variant];

  return (
    <div>
      <CardTitle className={titleClass}>{title}</CardTitle>
      <CardDescription>{formatParagraph(description)}</CardDescription>
    </div>
  );
}

const PageHeader = memo(Component);
export { PageHeader };
