import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { CardContent, CardWithShadow } from "@/components/ui";
import { memo } from "react";

interface EmailSentNoticeProps {
  title: string;
  description: string;
  body: string;
  actionButton?: React.ReactNode;
}

const Component = ({
  title,
  description,
  body,
  actionButton,
}: EmailSentNoticeProps) => {
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
          {actionButton}
        </CardContent>
      </CardWithShadow>
    </>
  );
};

const EmailSentNotice = memo(Component);
export { EmailSentNotice };
