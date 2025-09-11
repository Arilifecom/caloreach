import { loginSchema } from "@/app/auth/_components/_schema";
import { z } from "zod";

export type loginFormInput = z.infer<typeof loginSchema>;
