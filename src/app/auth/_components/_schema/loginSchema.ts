import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ message: "登録メールアドレスを入力してください" }),
  password: z.string().min(6, { message: "登録パスワードを入力してください" }),
});

export const loginFormInputResolver = zodResolver(loginSchema);
export type LoginFormInputSchema = z.infer<typeof loginSchema>;
