import z from "zod";

export const formatTypeValidation = z.enum(['Harvard', 'Modern', 'Ats'], {error: 'Asegúrate de seleccionar un formato válido.'});