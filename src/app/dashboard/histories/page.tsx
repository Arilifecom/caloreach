import {
  HistoryList,
  HistoryListSkeltone,
} from "@/app/dashboard/histories/_components";
import { getUserId } from "@/utils/db/auth";
import { Suspense } from "react";

export default async function HistoryPage() {
  const userId = await getUserId();

  return (
    <>
      <Suspense fallback={<HistoryListSkeltone />}>
        <HistoryList userId={userId} />
      </Suspense>
    </>
  );
}
