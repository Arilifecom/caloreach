import {
  TargetKcalListsSkeltone,
  TargetKcalSection,
} from "@/app/dashboard/target-kcal-plans/_component";
import { getUserId } from "@/utils/db/auth";
import { Suspense } from "react";

export default async function TargetKcalPage() {
  const userId = await getUserId();

  return (
    <>
      <Suspense fallback={<TargetKcalListsSkeltone />}>
        <TargetKcalSection userId={userId} />
      </Suspense>
    </>
  );
}
