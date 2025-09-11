import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const signupSchema = z
  .object({
    email: z.email({ message: "有効なメールアドレスを入力してください" }),
    password: z.string().min(6, { message: "6文字以上で入力してください" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export const loginSchemaResolver = zodResolver(signupSchema);
