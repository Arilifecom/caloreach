import { EmailSentNotice } from "@/app/auth/_components";

export default async function MailNoticePage({
  searchParams,
}: {
  searchParams: Promise<{
    type: "verify" | "reset" | "reset-success";
  }>;
}) {
  const { type } = await searchParams;

  return <EmailSentNotice type={type} />;
}
