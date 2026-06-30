// src/lib/auth-middleware.ts
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { createMiddleware } from "hono/factory";

// 型定義
declare module "hono" {
  interface ContextVariableMap {
    user: User;
  }
}

export const authMiddleware = createMiddleware(async (c, next) => {
  const supabase = await createClient();

  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json({ error: "認証が必要です" }, 401);
  }

  if (!authHeader.startsWith("Bearer ")) {
    return c.json(
      {
        error: "トークン形式が正しくありません",
        code: "INVALID_FORMAT",
      },
      401,
    );
  }
  const token = authHeader.substring(7);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return c.json({ error: "無効なトークンです" }, 401);
  }

  c.set("user", user);
  await next();
});
