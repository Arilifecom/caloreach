import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";

const connectionURL = process.env.DATABASE_URL;

if (!connectionURL) {
  throw new Error("DATABASE_URL is not defined");
}

// PostgreSQL接続の作成
const client = postgres(connectionURL, {
  prepare: false,
});

// Drizzleインスタンスの作成
export const db = drizzle(client, { schema, casing: "snake_case" });
