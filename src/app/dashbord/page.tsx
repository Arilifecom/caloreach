import { LogoutButton, PageHeader } from "@/components";
import { checkAuth, getUser } from "@/utils/auth";
import { getMealRecordByUserId } from "@/utils/api/mealRecords";
import { getTodayMMDD } from "@/utils/format";
import { MealRecordAddOption } from "@/app/dashbord/_components";

export default async function Dashboard() {
  await checkAuth();
  const userId = await getUser();
  const meals = await getMealRecordByUserId(userId);

  return (
    <div className="relative font-sans grid grid-rows-[20px_1fr_20px] items-center mx-auto justify-items-center min-h-screen max-w-md text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center">
        <LogoutButton />
        <PageHeader
          title={getTodayMMDD()}
          description="目標達成までがんばろう！"
        />
        <ul>
          <h2 className="text-2xl font-bold mb-4">ユーザーの食事記録</h2>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <li key={meal.id}>
                <div>
                  <p>食事名：{meal.foodName}</p>
                  <p>摂取量：{meal.gram}グラム</p>
                  <p>摂取カロリー{meal.kcal}カロリー</p>
                </div>
              </li>
            ))
          ) : (
            <p className="font-medium text-center">
              今日の食事記録はありません
            </p>
          )}
        </ul>
        <MealRecordAddOption userId={userId} />
      </main>
    </div>
  );
}
