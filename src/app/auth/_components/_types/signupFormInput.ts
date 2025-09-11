import { signupSchema } from "@/app/auth/_components/_schema";
import { z } from "zod";

export type signupFormInput = z.infer<typeof signupSchema>;
