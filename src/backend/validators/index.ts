import z from "zod";

// MealRecord CREATE用スキーマ
export const createRecordSchema = z.object({
  id: z.uuid(),
  foodName: z.string().min(1).max(100),
  gram: z.number(),
  kcal: z.number(),
  eatenAt: z.coerce.date(),
  userId: z.uuid(),
  foodId: z.string().nullable().optional(),
});

// パスパラメータのスキーマ (UUID)
export const idParamSchema = z.object({
  id: z.uuid("有効なUUID形式ではありません"),
});

// 日付クエリのスキーマ (YYYY-MM-DD)
export const dateQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

// ReguralrFood CREATE用スキーマ
export const createRegularFoodSchema = z.object({
  id: z.string(),
  foodName: z.string(),
  gram: z.number(),
  kcal: z.number(),
  userId: z.uuid(),
});

// TargetKcalPlan CREATE用スキーマ
export const createTargetKcalPlansSchema = z.object({
  targetKcal: z.number(),
  effectiveDate: z.string(),
});

// Profile CREATE用スキーマ
export const createProfileSchema = z.object({
  userName: z.string(),
});

// Histriesスキーマ
export const historiesQuerySchema = z.object({
  limit: z
    .string()
    .transform((val) => Number(val))
    .refine((num) => !isNaN(num) && num > 0 && num <= 10),
  currentCursor: z.string(),
});
