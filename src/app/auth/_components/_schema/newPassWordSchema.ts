import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newPassWordSchema = z.object({
  password: z.string().min(6, { message: "6文字以上で入力してください" }),
});

export const newPassWordInputResolver = zodResolver(newPassWordSchema);
export type NewPassWordInputSchema = z.infer<typeof newPassWordSchema>;
