import z from "zod";
import { CreateCVSchema } from "../../../components/CreateCvForm/schemas/CreateCVSchema";

const backupElement = z.object({
    cv: CreateCVSchema,
    id: z.string(),
})

export const BackupSchema = z.array(backupElement);