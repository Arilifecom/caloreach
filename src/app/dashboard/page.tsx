import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { getUserId } from "@/utils/auth";

export default async function Dashboard() {
  const userId = await getUserId();

  return (
    <>
      <ProgressSection userId={userId} />
      <MealRecordSection userId={userId} />
    </>
  );
}
