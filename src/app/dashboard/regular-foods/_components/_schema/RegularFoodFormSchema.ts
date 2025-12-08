import { toHalfWidth } from "@/utils/format/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const RegularFoodFormSchema = z
  .object({
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
  }));

export const RegularFoodFormSchemaResolver = zodResolver(RegularFoodFormSchema);
export type RegularFoodFormInputSchemaInput = z.input<
  typeof RegularFoodFormSchema
>;
export type RegularFoodFormInputSchemaOutput = z.output<
  typeof RegularFoodFormSchema
>;
