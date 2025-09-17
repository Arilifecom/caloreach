import { z } from "zod";

export const userNameInputSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください" })
    .max(20, { message: "ユーザー名は20文字以内で入力してください" })
    .regex(/^[\p{L}\p{N}_]+$/u, {
      message: "ユーザー名は英数字・日本語・アンダースコアのみ使用できます",
    }),
});
