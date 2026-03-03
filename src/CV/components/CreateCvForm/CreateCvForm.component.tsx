import { useFieldArray, useForm } from "react-hook-form";
import InputComponent from "../../../shared/components/InputComponent/input.component";
import EducationElementComponent from "./components/EducationElement/EducationElement.component";
import WorkExperienceElementComponent from "./components/WorkExperienceElement/WorkExperienceElement.component";
import HeaderWithContentComponent from "../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { CreateCVSchema } from "./schemas/CreateCVSchema";
import { z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateCvInterface } from "../../interfaces/CreateCVInterface";

export type CreateCvFormBody = z.infer<typeof CreateCVSchema>;

function CreateCvForm() {
    const { register, handleSubmit, trigger, watch, control,formState: {errors, isSubmitted, isDirty, isValid, dirtyFields, touchedFields}, resetField, setError, clearErrors, getValues} = useForm<CreateCvFormBody>({
        mode: 'onChange',
        defaultValues: {
            fullname: '',
            email: '',
            phoneNumber: ``,
            resume: '',
            education: [],
            profesionalLinks: {github: '', linkedIn: '', portfolioWeb: ''},
            residence: {city: '', country: ''},
            workExperience: []
        },
        resolver: zodResolver(CreateCVSchema)
    });

    const {append, remove, fields} = useFieldArray({control, name: 'education'});
    const {append: appendWorkExperience, remove: removeWorkExperience, fields: workExperienceFields} = useFieldArray({control, name: 'workExperience'});

    const handleDeleteEducationElement =  (id: number) =>{
        remove(id);
    }

    const handleDeleteWorkExperienceElement = (id:number) => {
        removeWorkExperience(id);
    }

    async function onSubmit(event: React.SubmitEvent){
        event.preventDefault();
        const result = await trigger();
        if(!result) return;
        const value = getValues();

        const links = Object.fromEntries(Object.entries(value.profesionalLinks).filter(([_, v]) => v != ''))
        
        const body: CreateCvInterface = {
            ...value,
            profesionalLinks: links
        }

        console.log(body);
    }
    
    return (
        <form onSubmit={(event) => onSubmit(event)} className="flex flex-col gap-y-6">
            <div className="grid grid-cols-2 gap-x-4 h-134 items-start">
                <section className="bg-base-100 p-2 rounded">
                    <HeaderWithContentComponent
                        title="Datos personales"
                        content="Ingresa tus datos personales"
                        level={3}
                    />
                    <section className="h-119 overflow-y-auto">
                        <div className="grid grid-cols-2">
                            <InputComponent<CreateCvFormBody> 
                            errors={errors} 
                            label="Nombre completo" 
                            name="fullname" 
                            register={register} 
                            type="text"
                            validations={
                                    {
                                        required: "Este campo es requerido",
                                    }
                                }
                            />
                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="Correo electrónico" 
                                name="email" 
                                register={register} 
                                type="text"
                                validations={
                                        {
                                            required: "Este campo es requerido",
                                            minLength: {message: "Debes colocar al menos 8 caracteres", value: 8},
                                        }
                                    }
                            />
                            
                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="Teléfono de contacto" 
                                name="phoneNumber" 
                                register={register} 
                                type="text"
                                validations={
                                        {
                                            required: "Este campo es requerido",
                                            minLength: {message: "Un número de teléfono tiene mínimo 8 caracteres", value: 8},
                                            maxLength: {message: "El número de teléfono con lada no puede ser mayor a 13 caracteres", value: 13},
                                            pattern: {
                                                message: 'Asegúrate de añadir un número de teléfono válido', 
                                                value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
                                            }
                                        }
                                    }
                            />

                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="Ciudad de residencia" 
                                name="residence.city" 
                                register={register} 
                                type="text"
                                validations={
                                        {
                                            required: "Este campo es requerido",
                                            minLength: {message: "Debes colocar al menos 8 caracteres", value: 8},
                                        }
                                    }
                            />
                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="País de residencia" 
                                name="residence.country" 
                                register={register} 
                                type="text"
                                validations={
                                        {
                                            required: "Este campo es requerido",
                                        }
                                    }
                            />
                        </div>

                        <div className="flex gap-x-3 justify-between">
                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="Github" 
                                name="profesionalLinks.github" 
                                register={register} 
                                type="text"
                            />
                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="LinkedIn" 
                                name="profesionalLinks.linkedIn" 
                                register={register} 
                                type="text"
                            />
                            <InputComponent<CreateCvFormBody> 
                                errors={errors} 
                                label="Portafolio Web" 
                                name="profesionalLinks.portfolioWeb" 
                                register={register} 
                                type="text"
                            />
                        </div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Resume tu perfil profesional</legend>
                            <textarea 
                                className="textarea h-24 w-full" 
                                placeholder="Bio"
                                
                                {...register("resume", {
                                    required: {message: 'El perfil profesional es obligatorio',value: true},
                                    minLength: {message: 'Un resumen de perfil profesional no puede ser demasiado corto', value: 200}
                                })}
                            >

                            </textarea>
                            <p>{errors.resume && errors.resume.message}</p>
                        </fieldset>
                    </section>
                </section>

                <section className="bg-base-100 rounded p-2">
                    <section className="flex flex-col items-center gap-x-5">
                        <HeaderWithContentComponent
                        title="Educación"
                        content="Añade tus datos académicos"
                        level={3}
                        positionText="start"
                        >
                            <button className="btn btn-success" type="button" onClick={() => append({graduationDate: '', institutionName: '', titleName: '', type: 'curso'})}>Añadir nuevo</button>
                        </HeaderWithContentComponent>
                    </section>

                    <section className="h-119 overflow-y-auto flex flex-col gap-y-3 py-2">
                        <p className="text-error text-xs">{errors.education?.message}</p>
                        {
                            fields.length === 0 
                                &&
                                <div className="flex h-full items-center justify-center">
                                    <p>Aún no has añadido nada.</p>
                                </div>
                        }
                        {fields.map((education, index) => {
                            
                            return (
                                <EducationElementComponent control={control} errors={errors} index={index} register={register} key={education.id} onDeleteEducationElement={handleDeleteEducationElement}/>
                            )
                        })}
                    </section>
                </section>
            </div>
            <section className="bg-base-100 p-4">
                        <HeaderWithContentComponent
                        title="Experiencia laboral"
                        content="Añade tu experiencia laboral"
                        level={3}
                        positionText="start"
                        className="mb-4"
                        >
                            <button type="button" className="btn btn-success" onClick={() => appendWorkExperience({achievements: [], companyName: '', occupation: '', startDate: ''})} >Añadir experiencia laboral</button>
                        </HeaderWithContentComponent>
                    
                    
                    <section className="flex flex-col gap-y-3 rounded">
                        <p className="text-error text-xs">{errors.workExperience?.message}</p>
                        {workExperienceFields.length === 0 && <p className="w-full text-center">Sin experiencias laborales añadidas</p>}
                        {workExperienceFields.map((experience, index) => {
                            return (
                                <WorkExperienceElementComponent control={control} errors={errors} index={index} onDeleteWorkExperienceElement={handleDeleteWorkExperienceElement} register={register} key={experience.id}/>
                            )
                        })}
                    </section>
            </section>
            <button className="btn btn-info" type="submit">Generar CV</button>
        </form>
    );
}

export default CreateCvForm;