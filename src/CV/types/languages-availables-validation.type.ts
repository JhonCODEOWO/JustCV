import type z from "zod";
import type { languagesAvailableValidation } from "../schemas/format-type-validation";

export type LanguagesAvailable = z.infer<typeof languagesAvailableValidation>;