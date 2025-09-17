import { userNameInputSchema } from "@/app/setup/_components/_schema";
import { z } from "zod";

export type userNameFormInput = z.infer<typeof userNameInputSchema>;
