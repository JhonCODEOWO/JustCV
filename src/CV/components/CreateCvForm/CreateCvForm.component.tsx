import { useFieldArray, useForm, type FieldPath } from "react-hook-form";
import InputComponent from "../../../shared/components/InputComponent/input.component";
import EducationElementComponent from "./components/EducationElement/EducationElement.component";
import WorkExperienceElementComponent from "./components/WorkExperienceElement/WorkExperienceElement.component";
import HeaderWithContentComponent from "../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { CreateCVSanitized, CreateCVSchema, type CreateCvFormBody } from "./schemas/CreateCVSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSteps } from "../../../shared/hooks/FormSteps/FormSteps";
import StepsTimelineComponent from "../../../shared/hooks/FormSteps/Components/StepsTimelineComponent/StepsTimelineComponent.component";
import type { Step } from "../../../shared/hooks/FormSteps/interfaces/StepInterface.interface";
import { createCv } from "../../requests/CVRequests";
import { useState } from "react";


type StepID = "personalData" | "educationData" | "laboralData" | "finalPhase";

function CreateCvForm() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const {actualPhase, nextPhase, prevPhase, totalPhases, goTo, elementsBefore} = useSteps([
        {
            id: 'personalData',
            title: 'Datos personales'
        },
        {
            id: 'educationData',
            title: 'Información Académica'
        },
        {
            id: 'laboralData',
            title: 'Experiencia Laboral'
        },
        {
            id: 'finalPhase',
            title: 'Finalizar proceso'
        },
        {
            id: 'pdfGenerated',
            title: 'Tu PDF está listo'
        }
    ]);
    
    const { register, handleSubmit, trigger, watch, control,formState: {errors, isSubmitted, isDirty, isValid, dirtyFields, touchedFields}, resetField, setError, clearErrors, getValues} = useForm<CreateCvFormBody>({
        mode: 'onChange',
        defaultValues: {
            fullname: 'Jonathan Juárez',
            email: 'jjv20618@gmail.com',
            phoneNumber: `7299353872`,
            resume: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit pulvinar odio, vel lacinia odio. Morbi maximus nisi in molestie ornare. Etiam in arcu enim. Curabitur non augue neque. Ut. `,
            education: [{graduationDate: '01-09-2002', institutionName: 'ITSSNP', titleName: 'Ing. Informática', type: 'titulo'}],
            profesionalLinks: {github: '', linkedIn: 'https://www.linkedin.com/in/jonathan-juarez-valera/', portfolioWeb: ''},
            residence: {city: 'Zacatlán', country: 'Puebla'},
            workExperience: [{achievements: [{description: 'nose'}], companyName: 'Empresa', occupation: 'Pajeador', startDate: '01-01-2002'}]
        },
        resolver: zodResolver(CreateCVSchema)
    });

    /**
     * Field values separated by a ID
     */
    const fieldsByStep: Record<StepID, FieldPath<CreateCvFormBody>[]> = {
            'personalData': ["fullname", "email", "phoneNumber", "profesionalLinks", "residence", "resume"],
            educationData: ["education"],
            laboralData: ["workExperience"],
            finalPhase: []
    }

    const {append, remove, fields} = useFieldArray({control, name: 'education'});
    const {append: appendWorkExperience, remove: removeWorkExperience, fields: workExperienceFields} = useFieldArray({control, name: 'workExperience'});

    const handleDeleteEducationElement =  (id: number) =>{
        remove(id);
    }

    const handleDeleteWorkExperienceElement = (id:number) => {
        removeWorkExperience(id);
    }

    const validate = async (stepID: StepID) => {
        const valid = await trigger(fieldsByStep[stepID]);
        if(!valid) return;
        nextPhase();
    }

    async function onSubmit(event: React.SubmitEvent){
        event.preventDefault();
        const result = await trigger();
        if(!result) return;
        const value = getValues();
        const body = CreateCVSanitized.parse(value);

        const {data} = await createCv(body);
        const url = URL.createObjectURL(data);
        setPdfUrl(url);
        goTo(4);
    }

    const downloadPDF = () => {
        const a = document.createElement('a');
        a.href = pdfUrl ?? '';
        a.download = `${Date.now()}.pdf`;
        a.click();
    }

    /**
     * Handle the wanted step function and evaluate every step before the index request if any has a error then
     * the go next operation can't be executed.
     * @param requestedIndex The index of the element request to go.
     * @param step The step element object requested.
     * @returns void
     */
    const handleWantedStep = async (requestedIndex: number, step: Step) => {
        const toEvaluate = elementsBefore(requestedIndex);
        const toValidate: Promise<boolean>[] = [];

        toEvaluate.forEach(step => {
            toValidate.push(trigger(fieldsByStep[step.id as StepID]));
        });
        
        const result: boolean[] = await Promise.all(toValidate);
        if(result.includes(false)) return;
        goTo(requestedIndex);
    }
    
    return (
        <form onSubmit={(event) => onSubmit(event)} className="flex flex-col gap-y-6">
            <div className="gap-x-4 flex items-start h-[calc(100dvh-64px)] p-3">
                    <StepsTimelineComponent actualPhase={actualPhase} steps={totalPhases} onStepWanted={handleWantedStep} className="h-full"/>
                {
                    actualPhase === 0
                        &&
                    <section className="bg-base-100 p-5 rounded flex-1 h-full">
                        <HeaderWithContentComponent
                            title="Datos personales"
                            content="Ingresa tus datos personales"
                            level={3}
                        />
                        <section>
                            <div className="grid grid-cols-3">
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
                                    validations={
                                        {
                                            required: true
                                        }
                                    }
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

                            {/* A component text area doesn't exists it need to be created */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Resume tu perfil profesional</legend>
                                <textarea 
                                    className={`textarea h-24 w-full outline-0 ${errors.resume ? 'border border-error' : ''}`}
                                    placeholder="Bio"
                                    
                                    {...register("resume", {
                                        required: {message: 'El perfil profesional es obligatorio',value: true},
                                        minLength: {message: 'Un resumen de perfil profesional no puede ser demasiado corto', value: 200}
                                    })}
                                >

                                </textarea>
                                <p className="text-xs text-error">{errors.resume && errors.resume.message}</p>
                            </fieldset>
                        </section>
                        <button className="btn btn-warning" type="button" onClick={() => validate("personalData")}>Continuar</button>
                    </section>
                }

                {
                    actualPhase === 1
                    &&
                    <section className="bg-base-100 rounded p-2 flex-1 h-full">
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
                                    <EducationElementComponent trigger={trigger} control={control} errors={errors} index={index} register={register} key={education.id} onDeleteEducationElement={handleDeleteEducationElement}/>
                                )
                            })}
                        </section>
                        <button className="btn btn-info" type="button" onClick={prevPhase}>Volver</button>
                        <button className="btn btn-warning" type="button" onClick={() => validate("educationData")}>Continuar</button>
                    </section>
                }

                {
                    actualPhase === 2
                    &&
                    <section className="flex justify-center flex-1 h-full overflow-auto">
                        <div className="bg-base-100 p-4 rounded w-full">
                            <HeaderWithContentComponent
                                title="Experiencia laboral"
                                content="Añade tu experiencia laboral"
                                level={3}
                                positionText="start"
                                className="mb-4"
                            >
                                <button type="button" className="btn btn-success" onClick={() => appendWorkExperience({achievements: [], companyName: '', occupation: '', startDate: ''})} >Añadir experiencia laboral</button>
                            </HeaderWithContentComponent>
                            
                            
                            <section className="flex flex-col gap-3 rounded">
                                {errors.workExperience && <p className="text-error text-xs col-span-2">{errors.workExperience.message}</p>}
                                {workExperienceFields.length === 0 && <p className="w-full text-center col-span-2">Sin experiencias laborales añadidas</p>}
                                {workExperienceFields.map((experience, index) => {
                                    return (
                                        <WorkExperienceElementComponent trigger={trigger} control={control} errors={errors} index={index} onDeleteWorkExperienceElement={handleDeleteWorkExperienceElement} register={register} key={experience.id}/>
                                    )
                                })}
                            </section>
                            <button className="btn btn-info" type="button" onClick={prevPhase}>Volver</button>
                            <button className="btn btn-warning" type="button" onClick={() => validate("laboralData")}>Continuar</button>
                        </div>
                    </section>
                }

                {
                    actualPhase === 3
                    &&
                    <section>
                        <HeaderWithContentComponent level={2} title="Ya casi hemos terminado" content="Selecciona el formato a generar y confirma para generar tu CV (:"/>
                        <section>
                            <button type="submit">Generar CV</button>
                            <button className="btn btn-info" type="button" onClick={prevPhase}>Volver</button>
                        </section>
                    </section>
                }

                {
                    actualPhase === 4
                    &&
                    <section>
                        <HeaderWithContentComponent level={2} title="CV Generado correctamente" content="Descarga tu CV o guarda el diseño."/>
                        {
                            pdfUrl
                            &&
                            <iframe src={pdfUrl} className="w-full h-[500px]"></iframe>
                        }
                        <section>
                            <button type="submit" className="btn btn-success" onClick={downloadPDF}>Descargar</button>
                            {/* <button className="btn btn-info" type="button" onClick={prevPhase}>Volver</button> */}
                        </section>
                    </section>
                }
            </div>
            {/* <button className="btn btn-info" type="submit">Generar CV</button> */}
        </form>
    );
}

export default CreateCvForm;