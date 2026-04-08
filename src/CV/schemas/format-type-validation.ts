import z from "zod";

export const languagesAvailableValidation = z.enum(['en', 'es']);