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
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return c.json({ error: "認証が必要です" }, 401);
  }

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
