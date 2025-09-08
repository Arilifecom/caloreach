import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PageHeaderProps {
  title: string;
  description?: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <CardHeader className="w-full px-0">
      <div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  );
}

export { PageHeader };
