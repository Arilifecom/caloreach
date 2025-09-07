ALTER TABLE "foods" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "meal_records" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "meal_records" ALTER COLUMN "food_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "regular_foods" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "regular_foods" ALTER COLUMN "food_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "target_kcal_history" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_food_selections" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_food_selections" ALTER COLUMN "food_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_food_selections" ADD CONSTRAINT "user_food_selections_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE no action ON UPDATE no action;