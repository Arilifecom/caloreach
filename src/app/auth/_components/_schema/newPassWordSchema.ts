import { z } from "zod";

export const newPassWordSchema = z.object({
  password: z.string().min(6, { message: "6文字以上で入力してください" }),
});
