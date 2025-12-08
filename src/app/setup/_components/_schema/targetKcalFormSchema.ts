import { toHalfWidth } from "@/utils/format/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const TargetKcalInputSchema = z.object({
  targetKcal: z
    .string()
    .transform(toHalfWidth)
    .transform((val) => Number(val))
    .refine((val) => val > 100, {
      message: "100以上の値を入力してください",
    }),
});

export const TargetKcalInputResolver = zodResolver(TargetKcalInputSchema);
export type TargetKcalInputSchemaInput = z.input<typeof TargetKcalInputSchema>;
export type TargetKcalInputSchemaOutput = z.output<
  typeof TargetKcalInputSchema
>;
