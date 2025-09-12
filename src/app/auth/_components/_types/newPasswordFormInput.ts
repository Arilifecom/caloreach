import { newPassWordSchema } from "@/app/auth/_components/_schema";
import { z } from "zod";

export type newPasswordFormInput = z.infer<typeof newPassWordSchema>;
