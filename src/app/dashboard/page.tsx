import { MealRecordSection } from "@/app/dashboard/_components";
import { LogoutButton, PageHeader } from "@/components";
import { fetchUserDailyMealRecords } from "@/utils/api/mealRecords";
import { checkAuth, getUser } from "@/utils/auth";
import { formatDateWithDay, getToday } from "@/utils/format";
import { getQueryClient, mealRecordkeys } from "@/utils/tanstack";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Dashboard() {
  await checkAuth();
  const userId = await getUser();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: mealRecordkeys.all(),
    queryFn: () => fetchUserDailyMealRecords(userId, today),
  });

  const dehydratedState = dehydrate(queryClient);

  const today = getToday();
  const displayDate = new Date();

  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <LogoutButton />
        <PageHeader
          title={formatDateWithDay(displayDate)}
          description="目標達成までがんばろう！"
        />

        <HydrationBoundary state={dehydratedState}>
          <MealRecordSection userId={userId} />
        </HydrationBoundary>
      </main>
    </div>
  );
}
