import { RedairectButton } from "@/app/auth/forgot-password/confirm/_component";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{
    confirmation_url: string;
  }>;
}) {
  //get confirmation_url from resset password mail params by Supabase
  const { confirmation_url } = await searchParams;

  return <RedairectButton confirmation_url={confirmation_url} />;
}
