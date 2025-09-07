"use client";

import { getMealRecordAction } from "@/actions/mealRecords/getList";
import { SelectMealRecord } from "@/db/schema";
import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const [meals, setMeals] = useState<SelectMealRecord[]>([]);

  const userId = "ded6e710-8c55-45b8-a7ed-8cd57b7d06ff";

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getMealRecordAction(userId);
      setMeals(data);
    };
    fetchFoods();
  }, []);

  return (
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
  );
};

export default DashBoard;
