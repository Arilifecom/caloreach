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
import { zValidator } from "@hono/zod-validator";
import {
  createProfileSchema,
  createRecordSchema,
  createRegularFoodSchema,
  createTargetKcalPlansSchema,
  dateQuerySchema,
  idParamSchema,
} from "@/backend/validators";

const app = new Hono().basePath("/api");

//MealRecord-----------------------------------------

const route = app
  .use("/dashboard/*", authMiddleware)
  // GET：指定された日付で一覧を取得
  .get(
    "/dashboard/mealrecords",
    zValidator("query", dateQuerySchema),
    async (c) => {
      const { date } = c.req.valid("query");
      const user = c.get("user");

      const data = await db.query.mealRecords.findMany({
        where: and(
          eq(mealRecords.userId, user.id),
          sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`,
        ),
        orderBy: [asc(mealRecords.eatenAt), asc(mealRecords.id)],
      });

      return c.json({ mealRecords: data }, 200);
    },
  )

  //GET：指定された日付のKcalを合計した結果を取得
  .get(
    "/dashboard/mealrecords/totalkcal",
    zValidator("query", dateQuerySchema),
    async (c) => {
      const { date } = c.req.valid("query");
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
    },
  )

  //POST
  .post(
    "/dashboard/mealrecords",
    zValidator("json", createRecordSchema),
    async (c) => {
      const InputData = c.req.valid("json");

      const data = await db.transaction(async (tx) => {
        const [insertedRecord] = await tx
          .insert(mealRecords)
          .values(InputData)
          .returning();

        // userFoodSelectionsテーブルから追加
        if (InputData.foodId) {
          await tx.insert(userFoodSelections).values({
            id: uuidv7(),
            userId: InputData.userId,
            foodId: InputData.foodId,
          });
        }
        return insertedRecord;
      });

      return c.json({ data }, 201);
    },
  )

  //UPDATE
  .put(
    "/dashboard/mealrecords/:id",
    zValidator("json", createRecordSchema),
    zValidator("param", idParamSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const InputData = c.req.valid("json");

      const data = await db
        .update(mealRecords)
        .set(InputData)
        .where(eq(mealRecords.id, id))
        .returning();

      return c.json({ data }, 201);
    },
  )

  //DELETE
  .delete(
    "/dashboard/mealrecords/:id",
    zValidator("param", idParamSchema),
    async (c) => {
      const { id } = c.req.valid("param");

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
      return c.body(null, 204);
    },
  )

  //RegularFoods------------------------------------

  // GET
  .get("/dashboard/regularfoods", async (c) => {
    const user = c.get("user");

    const data = await db.query.regularFoods.findMany({
      where: eq(regularFoods.userId, user.id),
      orderBy: [asc(regularFoods.createdAt), asc(regularFoods.id)],
    });

    return c.json({ mealRecords: data }, 200);
  })

  //POST
  .post(
    "/dashboard/regularfoods",
    zValidator("json", createRegularFoodSchema),
    async (c) => {
      const InputData = c.req.valid("json");

      const data = await db.insert(regularFoods).values(InputData).returning();

      return c.json({ data }, 201);
    },
  )

  //DELETE
  .delete(
    "/dashboard/regularfoods/:id",
    zValidator("param", idParamSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      await db.delete(regularFoods).where(eq(regularFoods.id, id));

      return c.body(null, 204);
    },
  )

  //UPDATE
  .put(
    "/dashboard/regularfoods/:id",
    zValidator("json", createRegularFoodSchema),
    zValidator("param", idParamSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const InputData = c.req.valid("json");

      const data = await db
        .update(regularFoods)
        .set(InputData)
        .where(eq(regularFoods.id, id))
        .returning();

      return c.json({ data }, 201);
    },
  )

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
  .post(
    "/dashboard/profiles",
    zValidator("json", createProfileSchema),
    async (c) => {
      const InputData = c.req.valid("json");
      const user = c.get("user");

      const [result] = await db
        .insert(profiles)
        .values({
          ...InputData,
          id: user.id,
        })
        .returning();

      return c.json({ result }, 201);
    },
  )

  //TargetKcalPlans------------------------------------\

  // GET
  .get("/dashboard/targetkcalplans", async (c) => {
    const user = c.get("user");

    const data = await db.query.targetKcalPlans.findMany({
      where: eq(targetKcalPlans.userId, user.id),
      orderBy: [asc(targetKcalPlans.effectiveDate), asc(targetKcalPlans.id)],
    });

    return c.json({ targetkcalRecords: data }, 200);
  })

  //POST
  .post(
    "/dashboard/targetkcalplans",
    zValidator("json", createTargetKcalPlansSchema),
    async (c) => {
      const InputData = c.req.valid("json");
      const user = c.get("user");

      const [result] = await db
        .insert(targetKcalPlans)
        .values({
          ...InputData,
          id: uuidv7(),
          userId: user.id,
        })
        .returning();

      return c.json(result, 201);
    },
  )

  //DELETE
  .delete("/dashboard/targetkcalplans/:id", async (c) => {
    const id = c.req.param("id");
    const user = c.get("user");

    await db
      .delete(targetKcalPlans)
      .where(
        and(eq(targetKcalPlans.id, id), eq(targetKcalPlans.userId, user.id)),
      );

    return c.body(null, 204);
  })

  //UPDATE
  .put(
    "/dashboard/targetkcalplans/:id",
    zValidator("param", idParamSchema),
    zValidator("json", createTargetKcalPlansSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const InputData = c.req.valid("json");
      const user = c.get("user");

      const [result] = await db
        .update(targetKcalPlans)
        .set(InputData)
        .where(
          and(eq(targetKcalPlans.id, id), eq(targetKcalPlans.userId, user.id)),
        )
        .returning();

      return c.json(result, 201);
    },
  )

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

export type AppType = typeof route;
