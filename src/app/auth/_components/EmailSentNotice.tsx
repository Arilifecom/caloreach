import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { CardContent, CardWithShadow } from "@/components/ui";
import { memo } from "react";

interface EmailSentNoticeProps {
  title: string;
  description: string;
  body: string;
}

const Component = ({ title, description, body }: EmailSentNoticeProps) => {
  return (
    <>
      <SiteLogo className="w-28" />
      <CardWithShadow className="relative w-full max-w-sm bg-primary-foreground">
        <div className="text-center px-6">
          <PageHeader title={title} description={description} />
        </div>
        <VerticalLine className="px-6" />
        <CardContent>
          <div>
            <p>{body}</p>
          </div>
        </CardContent>
        <VerticalLine className="px-6" />
        <p className="text-xs text-gray-500 mx-auto">
          © {new Date().getFullYear()} カロリーチ
        </p>
      </CardWithShadow>
    </>
  );
};

const EmailSentNotice = memo(Component);
export { EmailSentNotice };
