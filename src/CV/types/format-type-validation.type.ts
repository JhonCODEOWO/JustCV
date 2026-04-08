import type z from "zod";
import type { formatTypeValidation } from "../schemas/languages-available-validation";

export type FormatDownloadTypes = z.infer<typeof formatTypeValidation>;