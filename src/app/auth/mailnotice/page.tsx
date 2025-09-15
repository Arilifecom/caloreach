import { EmailSentNotice } from "@/app/auth/_components";
interface MailNoticePageProps {
  searchParams: {
    type: "verify" | "reset" | "reset-success";
  };
}

export default async function MailNoticePage({
  searchParams,
}: MailNoticePageProps) {
  const params = await searchParams;
  const type = params.type;

  return <EmailSentNotice type={type} />;
}
