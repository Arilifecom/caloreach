import { toHalfWidth } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const mealRecordInputSchema = z
  .object({
    date: z.string().min(1, "日付を入力してください"),
    time: z.string().min(1, "時間を入力してください"),
    foodName: z.string().min(1, "食事名を入力してください"),
    gram: z
      .string()
      .transform(toHalfWidth)
      .transform((val) => Number(val))
      .refine((val) => val > 1, {
        message: "食事量を入力してください",
      }),
    kcal: z
      .string()
      .transform(toHalfWidth)
      .transform((val) => Number(val))
      .refine((val) => val > 1, {
        message: "カロリー量を入力してください",
      }),
  })
  .transform((data) => ({
    foodName: data.foodName,
    gram: data.gram,
    kcal: data.kcal,
    eatenAt: new Date(`${data.date}T${data.time}:00+09:00`),
  }));

export const mealRecordSchemaResolver = zodResolver(mealRecordInputSchema);
export type mealRecordInputSchemaInput = z.input<typeof mealRecordInputSchema>;
export type mealRecordInputSchemaOutput = z.output<
  typeof mealRecordInputSchema
>;
