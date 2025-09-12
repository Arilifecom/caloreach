import { resetPassWordSchema } from "@/app/auth/_components/_schema";
import { z } from "zod";

export type resetPassWordFormInput = z.infer<typeof resetPassWordSchema>;
