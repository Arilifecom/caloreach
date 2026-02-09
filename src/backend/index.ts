import { authMiddleware } from "@/backend/Middleware/auth";
import { db } from "@/db";
import { mealRecords } from "@/db/schema";
import { and, asc, eq, sql } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.use("/dashboard/*", authMiddleware);

app.get("/dashboard/meal-records/:date", async (c) => {
  const date = c.req.param("date");
  const user = c.get("user");

  const data = await db.query.mealRecords.findMany({
    where: and(
      eq(mealRecords.userId, user.id),
      sql`DATE(${mealRecords.eatenAt} AT TIME ZONE 'Asia/Tokyo') = ${date}`,
    ),
    orderBy: [asc(mealRecords.eatenAt), asc(mealRecords.id)],
  });

  return c.json({ mealRecords: data });
});

export default app;
