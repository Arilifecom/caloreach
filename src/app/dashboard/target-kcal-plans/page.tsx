import { TargetKcalSection } from "@/app/dashboard/target-kcal-plans/_component";
import { getUserId } from "@/utils/db/auth";

export default async function TargetKcalPage() {
  const userId = await getUserId();

  return (
    <>
      <TargetKcalSection userId={userId} />
    </>
  );
}
