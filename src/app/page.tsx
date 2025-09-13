"use client";

import { getMealRecordAction } from "@/actions/mealRecords/getList";
import { Button } from "@/components/ui";
import { SelectMealRecord } from "@/db/schema";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [meals, setMeals] = useState<SelectMealRecord[]>([]);
  const router = useRouter();

  const userId = "ded6e710-8c55-45b8-a7ed-8cd57b7d06ff";

  const handleLogOut = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("サインアウトに失敗しました", error);
      return;
    }

    return router.push("/auth/login");
  };

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getMealRecordAction(userId);
      setMeals(data);
    };
    fetchFoods();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen text-sm p-6 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] w-full max-w-md row-start-2 items-center">
        <Button onClick={handleLogOut}>
          <LogOut />
        </Button>
        <ul>
          <h2 className="text-2xl font-bold mb-4">ユーザーの食事記録</h2>
          {meals.map((meal) => (
            <li key={meal.id}>
              <div>
                <p>食事名：{meal.foodName}</p>
                <p>摂取量：{meal.gram}グラム</p>
                <p>摂取カロリー{meal.kcal}カロリー</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
