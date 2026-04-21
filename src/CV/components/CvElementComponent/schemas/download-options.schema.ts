import z from "zod";
import { fileList } from "../../CreateCvForm/schemas/CreateCVSchema";
import { formatTypeValidation } from "../../../schemas/languages-available-validation";
import { languagesAvailableValidation } from "../../../schemas/format-type-validation";

export const DownloadOptions = z.object({
    formatType: formatTypeValidation,
    language: languagesAvailableValidation,
    profileImage: 
        fileList
        .refine(fileList => fileList.length > 0, {error: 'Es necesario que seleccione un archivo.'})
        .refine(fileList => (fileList.length === 1), {error: 'Solo se admite un archivo.'})
        .superRefine(async (files, ctx) => {
            const file = files[0];
            if(!file) return;

            const mb = file.size / (1024 * 1024);
            const filesValid: string[] = ['image/jpeg'];
            
            //Checks if the file exists in the valid formats.
            if(!filesValid.includes(file.type)) 
                ctx.addIssue({
                    code: 'custom', 
                    message: `Solo se permiten imágenes con formato: ${filesValid.join(' ')}`
                })
            
            if(mb > 2)
                ctx.addIssue({
                    code: 'custom',
                    message: `No se permiten archivos mayores a 2mb`
                })
        })
        ,
})

export type FormData = z.infer<typeof DownloadOptions>;