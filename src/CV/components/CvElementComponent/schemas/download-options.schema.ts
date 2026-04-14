import z from "zod";
import { fileList } from "../../CreateCvForm/schemas/CreateCVSchema";
import { formatTypeValidation } from "../../../schemas/languages-available-validation";
import { languagesAvailableValidation } from "../../../schemas/format-type-validation";

export const DownloadOptions = z.object({
    formatType: formatTypeValidation,
    language: languagesAvailableValidation,
    profileImage: 
        fileList
        .refine(fileList => fileList.length === 1, {error: 'Solo se admite un archivo.'})
        .superRefine(async (files, ctx) => {
            const file = files[0];
            
            if(!file) return;
            const filesValid: string[] = ['image/jpeg'];
            const image = await createImageBitmap(file);
            
            //Checks if the file exists in the valid formats.
            if(!filesValid.includes(file.type)) 
                ctx.addIssue({
                    code: 'custom', 
                    message: `Solo se permiten imágenes con formato: ${filesValid.join(' ')}`
                })
    
            //Check if the dimensions are correct
            if(!(image.width === 500 && image.height === 500))
                ctx.addIssue({
                    code: 'custom',
                    message: `Solo se admiten imágenes en formato de 500x500`
                })
    }),
})

export type FormData = z.infer<typeof DownloadOptions>;