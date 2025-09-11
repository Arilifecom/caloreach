import { EmailSentNotice } from "@/app/auth/_components";
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
          title="Reset your password"
          description="パスワードをお忘れですか？"
          body="登録したメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。"
        />
      );
  }
}
