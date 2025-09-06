import { sql } from "drizzle-orm";
import {
  date,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp(),
};

// meal_records Table
export const mealRecords = pgTable("meal_records", {
  id: serial().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => profiles.id),
  foodName: text().notNull(),
  gram: numeric().notNull(),
  kcal: numeric().notNull(),
  ...timestamp,
});

// profiles Table
export const profiles = pgTable("profiles", {
  id: uuid().primaryKey(),
  userName: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

// foods Table
export const foods = pgTable("foods", {
  id: serial().primaryKey(),
  foodName: text().notNull(),
  reading: text().notNull(),
  kcalPer100g: numeric("kcal_per_100g").notNull(),
});

// regular_foods Table
export const regularFoods = pgTable("regular_foods", {
  id: serial().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => profiles.id),
  foodName: text().notNull(),
  gram: numeric().notNull(),
  kcal: numeric().notNull(),
  ...timestamps,
});

// target_kcal_history Table
export const targetKcalHistory = pgTable("target_kcal_history", {
  id: serial("id").primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => profiles.id),
  targetKcal: numeric().notNull(),
  effectiveDate: date().notNull(),
  ...timestamps,
});

// user_food_selections Table
export const userFoodSelections = pgTable("user_food_selections", {
  id: serial().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => profiles.id),
  foodId: numeric().notNull(),
  ...timestamps,
});

export const schema = {
  mealRecords,
  profiles,
  foods,
  regularFoods,
  targetKcalHistory,
  userFoodSelections,
};

// 型
export type InsertMealRecord = typeof mealRecords.$inferInsert;
export type SelectMealRecord = typeof mealRecords.$inferSelect;
