import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "登録メールアドレスを入力してください" }),
  password: z.string().min(6, { message: "登録パスワードを入力してください" }),
});
