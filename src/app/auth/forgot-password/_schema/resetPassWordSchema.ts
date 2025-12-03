import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const resetPassWordSchema = z.object({
  email: z.email({ message: "登録メールアドレスを入力してください" }),
});

export const resetPassWordInputResolver = zodResolver(resetPassWordSchema);
export type ResetPassWordInputSchema = z.infer<typeof resetPassWordSchema>;
