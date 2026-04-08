import * as z from "zod"; 

const Education = z.object({
    titleName: z.string().min(1, 'Es obligatorio colocar el nombre del título'),
    institutionName: z.string().min(1, 'Es necesario conocer el nombre de la institución'),
    graduationDate: z.string().min(1, 'Debes colocar completa la fecha'),
    type: z.enum(['curso', 'titulo'], 'No se admite otro tipo de dato, selecciona curso o título')
});

const ProfesionalLinks = z.object({
    github: z.httpUrl().or(z.literal('')),
    linkedIn: z.httpUrl({error: 'Escribe una URL válida.'}),
    portfolioWeb: z.httpUrl().optional().or(z.literal('')),
})

const Residence = z.object({
    city: z.string().min(2, 'Escribe completo el nombre de la ciudad.'),
    country: z.string().min(3, 'Asegúrate de escribir bien el nombre del país.'),
})

const Achievement = z.object({
    description: z.string().min(1, 'Describe el logro destacado'),
})

const WorkExperience = z.object({
    companyName: z.string().min(1, 'El nombre de la empresa es requerido'),
    occupation: z.string().min(1, 'Es necesario conocer la ocupación de tu puesto.'),
    startDate: z.string().min(1, 'Es necesario conocer la fecha en la que iniciaste.'),
    achievements: z.array(Achievement).min(1, 'Coloca al menos 1 logro destacable.')
})

export const CreateCVSchema = z.object({
    fullname: z.string().regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)+$/, 'Debes incluir al menos un apellido o ambos apellidos separados por espacio.'),
    phoneNumber: z.string()
                    .regex(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, 'Escribe tu número de teléfono correctamente.'),
    resume: z.string().min(20, 'Un resumen profesional no puede ser tan pequeño, redacta un poco más acerca de ti.'),
    email: z.email(),
    education: z.array(Education).min(1, 'Debes agregar al menos un elemento de educación a tu CV.'),
    profesionalLinks: ProfesionalLinks,
    residence: Residence,
    workExperience: z.array(WorkExperience).min(1, 'No puedes crear un CV sin al menos una experiencia laboral.'),
})

/**
 * A const with a object transformed based on the main schema 
 * to generate the body required in the backend for a success response
 */
export const CreateCVSanitized = CreateCVSchema.transform((fields) => ({
    ...fields,
    profesionalLinks: Object.fromEntries(Object.entries(fields.profesionalLinks).filter(([k,v]) => v!= '')),
    workExperience: fields.workExperience.map((workExp) => {
        return {
            ...workExp,
            achievements: workExp.achievements.map(a => a.description),
        }
    })
}))

export type CreateCvFormBody = z.infer<typeof CreateCVSchema>;
export type CreateCvFormOutput = z.output<typeof CreateCVSanitized>;