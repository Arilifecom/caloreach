import { getMealRecordAction } from "@/actions/mealRecords/getList";
import { LogoutButton } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//Check user session
const authenticated = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data) {
    console.error("Error fetching Claims:", error || "no data");

    redirect("/auth/login");
  }
};

//Get user ID
const getUserId = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    console.error("Error fetching Claims:", error || "no data");
    redirect("/auth/login");
  }

  return data.user.id;
};

export default async function Home() {
  await authenticated();
  const userId = await getUserId();
  const meals = await getMealRecordAction(userId);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full max-w-md row-start-2 items-center">
        <LogoutButton />
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
      </main>
    </div>
  );
}
