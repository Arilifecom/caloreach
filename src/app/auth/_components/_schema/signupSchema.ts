import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupBaseSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z.string().min(6, { message: "6文字以上で入力してください" }),
  confirmPassword: z.string(),
});

export const signupSchema = signupBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  },
);

export const signupSchemaOutput = signupBaseSchema.omit({
  confirmPassword: true,
});

export const signupSchemaResolver = zodResolver(signupSchema);
export type signupInputSchemaInput = z.input<typeof signupSchema>;
export type signupInputSchemaOutput = z.output<typeof signupSchemaOutput>;
