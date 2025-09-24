import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z
  .object({
    email: z.email({ message: "有効なメールアドレスを入力してください" }),
    password: z.string().min(6, { message: "6文字以上で入力してください" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

//for api
export const signupSchemaOutput = signupSchema.omit({
  confirmPassword: true,
});

export const signupSchemaResolver = zodResolver(signupSchema);
export type signupInputSchemaInput = z.input<typeof signupSchema>;
export type signupInputSchemaOutput = z.output<typeof signupSchemaOutput>;
