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
import { and, asc, desc, eq, like, lt, lte, sql, sum } from "drizzle-orm";
import { Hono } from "hono";
import { v7 as uuidv7 } from "uuid";
import { zValidator } from "@hono/zod-validator";
import {
  createProfileSchema,
  createRecordSchema,
  createRegularFoodSchema,
  createTargetKcalPlansSchema,
  dateQuerySchema,
  historiesQuerySchema,
  idParamSchema,
  stringQuerySchema,
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
      const user = c.get("user");

      const data = await db
        .update(mealRecords)
        .set(InputData)
        .where(and(eq(mealRecords.id, id), eq(mealRecords.userId, user.id)))
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
      const user = c.get("user");

      await db.transaction(async (tx) => {
        const [record] = await tx
          .select()
          .from(mealRecords)
          .where(and(eq(mealRecords.id, id), eq(mealRecords.userId, user.id)));

        await tx
          .delete(mealRecords)
          .where(and(eq(mealRecords.id, id), eq(mealRecords.userId, user.id)));

        // userFoodSelectionsテーブルから削除
        if (record.foodId) {
          await tx
            .delete(userFoodSelections)
            .where(
              and(
                eq(userFoodSelections.foodId, record.foodId),
                eq(userFoodSelections.foodId, user.id),
              ),
            );
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
      const user = c.get("user");
      await db
        .delete(regularFoods)
        .where(and(eq(regularFoods.id, id), eq(regularFoods.userId, user.id)));

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
      const user = c.get("user");

      const data = await db
        .update(regularFoods)
        .set(InputData)
        .where(and(eq(regularFoods.id, id), eq(regularFoods.userId, user.id)))
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

  // GET（一覧取得）
  .get("/dashboard/targetkcalplans", async (c) => {
    const user = c.get("user");

    const data = await db.query.targetKcalPlans.findMany({
      where: eq(targetKcalPlans.userId, user.id),
      orderBy: [asc(targetKcalPlans.effectiveDate), asc(targetKcalPlans.id)],
    });

    return c.json({ targetkcalRecords: data }, 200);
  })

  // GET(該当の日付から過去の1番近い目標Kcalを返す)
  .get(
    "/dashboard/targetkcalplans/current",
    zValidator("query", dateQuerySchema),
    async (c) => {
      const { date } = c.req.valid("query");
      const user = c.get("user");

      const result = await db.query.targetKcalPlans.findFirst({
        where: and(
          eq(targetKcalPlans.userId, user.id),
          lte(targetKcalPlans.effectiveDate, date),
        ),
        orderBy: desc(targetKcalPlans.effectiveDate),
      });

      const targetKcal = result ? result.targetKcal : null;

      return c.json({ targetKcal }, 200);
    },
  )

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

  //Histories------------------------------------\
  .get(
    "/dashboard/histories",
    zValidator("query", historiesQuerySchema),
    async (c) => {
      const user = c.get("user");
      const { limit, currentCursor } = c.req.valid("query");

      const eatenDate = sql<string>`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo')`;

      const totalKcalData = await db
        .select({
          date: eatenDate.as("date"),
          totalKcal: sql<number>`SUM(${mealRecords.kcal})`.as("total_kcal"),
        })
        .from(mealRecords)
        .where(
          and(eq(mealRecords.userId, user.id), lt(eatenDate, currentCursor)),
        )
        .groupBy(eatenDate)
        .orderBy(desc(eatenDate))
        .limit(limit);

      if (totalKcalData.length === 0) {
        return c.json({
          historiesRecord: [],
          nextCursor: null,
          hasNext: false,
        });
      }

      //totalKcalDataに対してその日の目標カロリーを割り当てる
      const targetPlans = await db
        .select({
          effectiveDate: targetKcalPlans.effectiveDate,
          targetKcal: targetKcalPlans.targetKcal,
        })
        .from(targetKcalPlans)
        .where(
          and(
            eq(targetKcalPlans.userId, user.id),
            lte(targetKcalPlans.effectiveDate, currentCursor),
          ),
        )
        .orderBy(desc(targetKcalPlans.effectiveDate));

      //日ごとの合計カロリーにマージ
      const historiesRecord = totalKcalData.map((dailyRecord) => {
        const dailyTarget = targetPlans.find(
          (plan) => plan.effectiveDate <= dailyRecord.date,
        );

        return {
          date: dailyRecord.date,
          totalKcal: dailyRecord.totalKcal,
          targetKcal: dailyTarget?.targetKcal ?? 0,
        };
      });

      //next cursor
      const nextCursor =
        historiesRecord.length === limit
          ? historiesRecord[historiesRecord.length - 1].date
          : null;

      //has next
      const hasNext = historiesRecord.length === limit;

      return c.json({ historiesRecord, nextCursor, hasNext }, 200);
    },
  )

  //Foods------------------------------------\

  // GET
  .get("/foods", zValidator("query", stringQuerySchema), async (c) => {
    const { q } = c.req.valid("query");

    const result = await db.query.foods.findMany({
      where: like(foods.reading, `%${q}%`),
      limit: 10,
      columns: {
        id: true,
        foodName: true,
        kcalPer100g: true,
      },
    });
    return c.json({ foods: result }, 200);
  });

export default app;

export type AppType = typeof route;
