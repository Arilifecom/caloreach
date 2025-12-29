import { LoginButton } from "@/app/auth/_components/LoginButton";
import { PageHeader, VerticalLine } from "@/components";
import { SiteLogo } from "@/components/icons";
import { CardContent, CardHeader, CardWithShadow } from "@/components/ui";
import { memo } from "react";

interface EmailSentNoticeProps {
  type: "verify" | "reset" | "reset-success";
}

const Component = ({ type }: EmailSentNoticeProps) => {
  const switchText = () => {
    switch (type) {
      case "verify":
        return {
          title: "Check your Email",
          description: "確認メールを送信しました",
          body: "メール内のリンクをクリックして登録を完了してください。",
        };
      case "reset":
        return {
          title: "Check your Email",
          description: "パスワードリセットメールを送信しました",
          body: "メール内のリンクをクリックして、新しいパスワードを設定してください。",
        };
      case "reset-success":
        return {
          title: "Password Updated",
          description: "パスワードの更新が完了しました",
          body: "新しいパスワードでログインしてください。",
          actionButton: <LoginButton />,
        };
    }
  };

  const text = switchText();

  return (
    <>
      <SiteLogo className="w-24 md:w-28" />
      <CardWithShadow className="bg-primary-foreground">
        <CardHeader className="text-center">
          <PageHeader title={text.title} description={text.description} />
        </CardHeader>
        <VerticalLine className="px-6" />
        <CardContent>
          <div>
            <p>{text.body}</p>
          </div>
          {text.actionButton}
        </CardContent>
      </CardWithShadow>
    </>
  );
};

const EmailSentNotice = memo(Component);
export { EmailSentNotice };
