import { z } from "zod";

export const resetPassWordSchema = z.object({
  email: z.email({ message: "登録メールアドレスを入力してください" }),
});
