import { authMiddleware } from "@/backend/Middleware/auth";
import { db } from "@/db";
import {
  foods,
  mealRecords,
  profiles,
  regularFoods,
  targetKcalPlans,
  userFoodSelections,
} from "@/db/schema";
import { and, asc, eq, like, sql, sum } from "drizzle-orm";
import { Hono } from "hono";
import { v7 as uuidv7 } from "uuid";

const app = new Hono().basePath("/api");
app
  .use("/dashboard/*", authMiddleware)

  //MealRecord-----------------------------------------

  // GET：指定された日付で一覧を取得
  .get("/dashboard/meal-records", async (c) => {
    const date = c.req.query("date");
    const user = c.get("user");

    const data = await db.query.mealRecords.findMany({
      where: and(
        eq(mealRecords.userId, user.id),
        sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`,
      ),
      orderBy: [asc(mealRecords.eatenAt), asc(mealRecords.id)],
    });

    return c.json({ mealRecords: data }, 200);
  })

  //GET：指定された日付のKcalを合計した結果を取得
  .get("/dashboard/meal-records/total-kcal", async (c) => {
    const date = c.req.query("date");
    const user = c.get("user");

    const [result] = await db
      .select({ totalKcal: sum(mealRecords.kcal) })
      .from(mealRecords)
      .where(
        and(
          eq(mealRecords.userId, user.id),
          sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`,
        ),
      );

    return c.json({ totalKcal: Number(result.totalKcal) || 0 }, 200);
  })

  //POST
  .post("/dashboard/meal-records", async (c) => {
    const InputData = await c.req.json();

    await db.transaction(async (tx) => {
      await tx.insert(mealRecords).values(InputData);

      // userFoodSelectionsテーブルから追加
      if (InputData.foodId) {
        await tx.insert(userFoodSelections).values({
          id: uuidv7(),
          userId: InputData.userId,
          foodId: InputData.foodId,
        });
      }
    });

    return c.json({ success: true }, 201);
  })

  //DELETE
  .delete("/dashboard/meal-records/:id", async (c) => {
    const id = c.req.param("id");

    await db.transaction(async (tx) => {
      const [record] = await tx
        .select()
        .from(mealRecords)
        .where(eq(mealRecords.id, id));

      await tx.delete(mealRecords).where(eq(mealRecords.id, id));

      // userFoodSelectionsテーブルから削除
      if (record.foodId) {
        await tx
          .delete(userFoodSelections)
          .where(eq(userFoodSelections.foodId, record.foodId));
      }
    });
    return c.status(204);
  })

  //UPDATE
  .put("/dashboard/meal-records/:id", async (c) => {
    const InputData = await c.req.json();

    await db
      .update(mealRecords)
      .set({ ...InputData, updatedAt: sql`NOW()` })
      .where(eq(mealRecords.id, InputData.id));

    return c.json({ success: true }, 201);
  })

  //RegularFoods------------------------------------

  // GET
  .get("/dashboard/regular-foods", async (c) => {
    const user = c.get("user");

    const data = await db.query.regularFoods.findMany({
      where: eq(regularFoods.userId, user.id),
      orderBy: [asc(regularFoods.createdAt), asc(regularFoods.id)],
    });

    return c.json({ mealRecords: data }, 200);
  })

  //POST
  .post("/dashboard/regular-foods", async (c) => {
    const InputData = await c.req.json();

    await db.insert(regularFoods).values(InputData);

    return c.json({ success: true }, 201);
  })

  //DELETE
  .delete("/dashboard/regular-foods/:id", async (c) => {
    const id = c.req.param("id");

    await db.delete(regularFoods).where(eq(regularFoods.id, id));

    return c.status(204);
  })

  //UPDATE
  .put("/dashboard/regular-foods/:id", async (c) => {
    const InputData = await c.req.json();

    await db
      .update(regularFoods)
      .set({ ...InputData, updatedAt: sql`NOW()` })
      .where(eq(regularFoods.id, InputData.id));

    return c.json({ success: true }, 201);
  })

  //Profiles------------------------------------

  // GET
  .get("/dashboard/profiles", async (c) => {
    const user = c.get("user");

    const [data] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, user.id));

    return c.json({ profile: data }, 200);
  })

  //POST
  .post("/dashboard/profiles", async (c) => {
    const InputData = await c.req.json();

    await db.insert(profiles).values(InputData);

    return c.json({ success: true }, 201);
  })

  //TargetKcalHistory------------------------------------\

  .get("/dashboard/target-kcal-plans", async (c) => {
    const user = c.get("user");

    const data = await db.query.targetKcalPlans.findMany({
      where: eq(targetKcalPlans.userId, user.id),
      orderBy: [asc(targetKcalPlans.createdAt), asc(targetKcalPlans.id)],
    });

    return c.json({ historyRecords: data }, 200);
  })

  //POST
  .post("/dashboard/target-kcal-plans", async (c) => {
    const InputData = await c.req.json();

    await db.insert(targetKcalPlans).values(InputData);

    return c.json({ success: true }, 201);
  })

  //DELETE
  .delete("/dashboard/target-kcal-plans/:id", async (c) => {
    const id = c.req.param("id");

    await db.delete(targetKcalPlans).where(eq(targetKcalPlans.id, id));

    return c.status(204);
  })

  //UPDATE
  .put("/dashboard/target-kcal-plans/:id", async (c) => {
    const InputData = await c.req.json();

    await db
      .update(targetKcalPlans)
      .set({ ...targetKcalPlans, updatedAt: sql`NOW()` })
      .where(eq(targetKcalPlans.id, InputData.id));

    return c.json({ success: true }, 201);
  })

  //Foods------------------------------------\

  // GET
  .get("/foods", async (c) => {
    const q = c.req.query("q");

    const result = await db.query.foods.findMany({
      where: like(foods.reading, `%${q}%`),
      limit: 10,
      columns: {
        id: true,
        foodName: true,
        kcalPer100g: true,
      },
    });
    return c.json({ data: result }, 200);
  });

export default app;
