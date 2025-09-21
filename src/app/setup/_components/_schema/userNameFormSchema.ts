import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const userNameInputSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください" })
    .max(20, { message: "ユーザー名は20文字以内で入力してください" })
    .regex(/^[\p{L}\p{N}_]+$/u, {
      message: "ユーザー名は英数字・日本語・アンダースコアのみ使用できます",
    }),
});

export const userNameInputResolver = zodResolver(userNameInputSchema);
export type UserNameInputSchema = z.infer<typeof userNameInputSchema>;
