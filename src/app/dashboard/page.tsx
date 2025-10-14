import { MealRecordSection } from "@/app/dashboard/_components";
import { LogoutButton, PageHeader } from "@/components";
import { checkAuth, getUser } from "@/utils/auth";
import { formatDateWithDay } from "@/utils/format";

export default async function Dashboard() {
  await checkAuth();
  const userId = await getUser();

  const date = new Date();

  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <LogoutButton />
        <PageHeader
          title={formatDateWithDay(date)}
          description="目標達成までがんばろう！"
        />
        <MealRecordSection userId={userId} />
      </main>
    </div>
  );
}
