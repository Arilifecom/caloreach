import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { getUserId } from "@/utils/auth";
import { formatYYMMDD } from "@/utils/format/date";

export default async function Dashboard() {
  const userId = await getUserId();

  const today = new Date();
  const date = formatYYMMDD(today);

  return (
    <>
      <ProgressSection userId={userId} date={date} />
      <MealRecordSection userId={userId} date={date} />
    </>
  );
}
