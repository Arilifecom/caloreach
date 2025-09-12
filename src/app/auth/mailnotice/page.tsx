import { EmailSentNotice, LoginButton } from "@/app/auth/_components";
import { use } from "react";

type MailNoticePageProps = {
  searchParams: { type?: string };
};

export default function MailNoticePage({ searchParams }: MailNoticePageProps) {
  const params = use(Promise.resolve(searchParams));

  switch (params.type) {
    case "verify":
    default:
      return (
        <EmailSentNotice
          title="Check your Email"
          description="確認メールを送信しました"
          body="メール内のリンクをクリックして登録を完了してください。"
        />
      );
    case "reset":
      return (
        <EmailSentNotice
          title="Check your Email"
          description="パスワードリセットメールを送信しました"
          body="メール内のリンクをクリックして、新しいパスワードを設定してください。"
        />
      );
    case "reset-success":
      return (
        <EmailSentNotice
          title="Password Updated"
          description="パスワードの更新が完了しました"
          body="新しいパスワードでログインしてください。"
          actionButton={<LoginButton />}
        />
      );
  }
}
