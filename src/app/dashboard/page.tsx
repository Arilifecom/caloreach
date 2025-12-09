import {
  MealRecordSection,
  ProgressSection,
} from "@/app/dashboard/_components";
import { PageHeader } from "@/components";
import { getUserId } from "@/utils/auth";
import { formatDateWithDay, formatYYMMDD } from "@/utils/format/date";

export default async function Dashboard() {
  const userId = await getUserId();

  const today = new Date();
  const date = formatYYMMDD(today);
  const formatedDisplayDate = formatDateWithDay(today);

  return (
    <>
      <PageHeader
        title={`今日の食事記録｜ ${formatedDisplayDate} `}
        description="目標達成までのカロリー進捗を確認しましょう。今日の一歩が習慣になります。"
      />
      <ProgressSection userId={userId} date={date} />
      <MealRecordSection userId={userId} date={date} />
    </>
  );
}
