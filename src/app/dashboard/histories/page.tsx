import { HistoryList } from "@/app/dashboard/histories/_components";
import { getUserId } from "@/utils/db/auth";

export default async function HistoryPage() {
  const userId = await getUserId();

  return (
    <>
      <HistoryList userId={userId} />
    </>
  );
}
