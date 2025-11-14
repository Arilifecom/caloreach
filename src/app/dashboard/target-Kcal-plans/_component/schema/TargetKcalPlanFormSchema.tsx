import { toHalfWidth } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const TargetKcalPlanFormSchema = z
  .object({
    targetKcal: z
      .string()
      .transform(toHalfWidth)
      .transform((val) => Number(val))
      .refine((val) => val > 100, {
        message: "100以上の値を入力してください",
      }),
    effectiveDate: z.string().min(1, "日付を入力してください"),
  })
  .transform((data) => ({
    targetKcal: data.targetKcal,
    effectiveDate: new Date(`${data.effectiveDate}T00:00+09:00`),
  }));

export const TargetKcalPlanInputResolver = zodResolver(
  TargetKcalPlanFormSchema
);
export type TargetKcalPlanInputSchemaInput = z.input<
  typeof TargetKcalPlanFormSchema
>;
export type TargetKcalPlanInputSchemaOutput = z.output<
  typeof TargetKcalPlanFormSchema
>;
