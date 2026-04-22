import { useFieldArray, useForm, type FieldPath } from "react-hook-form";
import InputComponent from "../../../shared/components/InputComponent/input.component";
import EducationElementComponent from "./components/EducationElement/EducationElement.component";
import WorkExperienceElementComponent from "./components/WorkExperienceElement/WorkExperienceElement.component";
import HeaderWithContentComponent from "../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { CreateCVSchema, type CreateCvFormBody } from "./schemas/CreateCVSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSteps } from "../../../shared/hooks/FormSteps/FormSteps";
import StepsTimelineComponent from "../../../shared/hooks/FormSteps/Components/StepsTimelineComponent/StepsTimelineComponent.component";
import type { Step } from "../../../shared/hooks/FormSteps/interfaces/StepInterface.interface";
import SelectComponent from "../../../shared/components/SelectComponent/SelectComponent";
import { useNavigate } from "react-router-dom";
import { useCvsContext } from "../../contexts/CvsContext/hooks/CvsContextHook";
import LevelRateInputComponent from "../../../shared/components/LevelRateComponent/LevelRateInputComponent.component";
import ErrorTextComponent from "../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";
import TextAreaComponent from "../../../shared/components/TextAreaComponent/TextAreaComponent.component";

//TODO: The useSteps hook should retrieve this values
type StepID = "personalData" | "educationData" | "laboralData" | "skillsLanguage" | "finalPhase" | "projects";

function CreateCvForm() {
    const navigate = useNavigate();
    const {addCv} = useCvsContext();
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
            id: 'skillsLanguage',
            title: 'Idiomas y Habilidades'
        },
        {
            id: 'projects',
            title: 'Proyectos personales'
        },
        {
            id: 'finalPhase',
            title: 'Finalizar proceso'
        }
    ]);

    const rateElements = [
        {
            title: '1',
            value: 1,
        },
        {
            title: '2',
            value: 2,
        },
        {
            title: '3',
            value: 3,
        },
        {
            title: '4',
            value: 4,
        },
        {
            title: '5',
            value: 5,
        },
    ]
    
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
            workExperience: [{achievements: [{description: 'nose'}], companyName: 'Empresa', occupation: 'Pajeador', startDate: '01-01-2002'}],
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
            skillsLanguage: ["skills", "languages"],
            projects: ["projects"],
            finalPhase: []
    }

    const {append, remove, fields} = useFieldArray({control, name: 'education'});
    const {append: appendWorkExperience, remove: removeWorkExperience, fields: workExperienceFields} = useFieldArray({control, name: 'workExperience'});
    const {fields: languages, append: appendLanguage, remove: removeLanguage} = useFieldArray({control, name: 'languages'});
    const {fields: skills, append: appendSkill, remove: removeSkill} = useFieldArray({control, name: 'skills'});
    const { fields: projects, append: appendProject, remove: removeProject } = useFieldArray({control, name: 'projects'});

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

        addCv(value);
        navigate('/home');
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
        <form onSubmit={(event) => onSubmit(event)} className="flex gap-y-6 justify-center">
            <div className="gap-x-4 grid grid-cols-3 p-3 w-[65%]">
                <StepsTimelineComponent actualPhase={actualPhase} steps={totalPhases} onStepWanted={handleWantedStep} className="h-full"/>
                {
                    actualPhase === 0
                        &&
                    <section className="bg-base-100 p-5 rounded flex-1 h-full col-start-2 col-end-4">
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
                    <section className="bg-base-100 rounded p-2 flex-1 h-full col-start-2 col-end-4">
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
                    <section className="flex justify-center flex-1 h-full overflow-auto col-start-2 col-end-4">
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
                    <section className="flex flex-col col-start-2 col-end-4">
                        <HeaderWithContentComponent level={3} title="Idiomas & Habilidades" content="Especifica habilidades e idiomas con tu nivel."/>
                        <section className="grid grid-cols-2 gap-x-4 mt-4">
                            <div>
                                <HeaderWithContentComponent 
                                    level={4} 
                                    title="Habilidades" 
                                    content="Redacta cada habilidad y el rango de dominio sobre ellas."
                                >
                                    <button type="button" className="btn btn-info" onClick={() => appendSkill({level: 1, name: ''})} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                                    </button>
                                </HeaderWithContentComponent>
                                {errors.skills && <ErrorTextComponent error={errors.skills.message ?? ''}/>}

                                {
                                    skills.map((skill, index) => (
                                        <div key={skill.id} className="relative">
                                            <InputComponent<CreateCvFormBody> 
                                                register={register} 
                                                errors={errors}
                                                label="Habilidad"
                                                name={`skills.${index}.name`}
                                                type="text"
                                                validations={{required: true}}
                                            />
                                            <LevelRateInputComponent<CreateCvFormBody>
                                                errors={errors}
                                                control={control}
                                                name={`skills.${index}.level`}
                                                rateElements={rateElements}
                                                label="Nivel de habilidad"
                                            />
                                            <button type="button" onClick={() => removeSkill(index)} className="cursor-pointer absolute right-0 top-0 text-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                            <div>
                                <HeaderWithContentComponent 
                                    level={4} 
                                    title="Idioma" 
                                    content="Añade los idiomas que dominas y nivel de cada uno."
                                >
                                    <button type="button" className="btn btn-info"onClick={() => appendLanguage({level: 'Nativo', name: ''})}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                                    </button>
                                </HeaderWithContentComponent>
                                {errors.languages && <ErrorTextComponent error={errors.languages.message ?? ''}/>}

                                {
                                    languages.map((language, index) => (
                                        <div key={language.id} className="relative">
                                            <InputComponent<CreateCvFormBody> 
                                                errors={errors} 
                                                label="Nombre del idioma"
                                                name={`languages.${index}.name`}
                                                register={register}
                                                type="text"
                                                validations={{required: true}}
                                            />
                                            <SelectComponent<CreateCvFormBody>
                                                errors={errors}
                                                label="Selecciona el nivel del idioma"
                                                name={`languages.${index}.level`}
                                                register={register}
                                                selectOptions={[
                                                    {label: 'Nativo', value: 'Nativo' },
                                                    {label: 'A1', value: 'A1' },
                                                    {label: 'A2', value: 'A1' },
                                                    {label: 'B1', value: 'B1' },
                                                    {label: 'B2', value: 'B2' },
                                                    {label: 'C1', value: 'C1' },
                                                    {label: 'C2', value: 'C2' },
                                                ]}
                                                isOptional={false}
                                            />
                                            <button type="button" onClick={() => removeLanguage(index)} className="cursor-pointer absolute right-0 top-0 text-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                        <div className="mt-auto flex justify-between">
                            <button type="button" className="btn btn-info" onClick={prevPhase}>Volver</button>
                            <button type="button" className="btn btn-warning" onClick={() => validate("skillsLanguage")}>Continuar</button>
                        </div>
                    </section>
                }

                {
                    actualPhase == 4
                    &&
                    <section className="flex flex-col col-start-2 col-end-4">
                            <HeaderWithContentComponent 
                            level={3} 
                            title="Proyectos" 
                            content="Coloca tus proyectos personales más relevantes para tu CV"
                            >
                                <button 
                                    type="button" 
                                    className="btn btn-info" 
                                    onClick={() => appendProject({description: '', link: '', title: ''})}>
                                        Añadir nuevo
                                </button>
                            </HeaderWithContentComponent>
                        {errors.projects && <ErrorTextComponent error={errors.projects.message ?? ''}/>}
                        <section>
                            {
                                projects.length > 0 ?
                                    projects.map((project, index) => (
                                        <div key={project.id} className="py-3">
                                            <button type="button" onClick={() => removeProject(index)}>Eliminar</button>
                                            <div className="grid grid-cols-2 gap-x-3">
                                                <InputComponent<CreateCvFormBody>
                                                    errors={errors}
                                                    label="Nombre del proyecto"
                                                    name={`projects.${index}.title`}
                                                    register={register}
                                                    type="text"
                                                    validations={{required: true}}
                                                />
                                                <InputComponent<CreateCvFormBody>
                                                    errors={errors}
                                                    label="Link"
                                                    name={`projects.${index}.link`}
                                                    register={register}
                                                    type="text"
                                                    validations={{}}
                                                />
                                            </div>
                                            <TextAreaComponent 
                                                errors={errors}
                                                label="Descripción del proyecto"
                                                name={`projects.${index}.description`}
                                                register={register}
                                                required={true}
                                                placeholder="El proyecto fué realizado con..."
                                            />
                                        </div>
                                    ))
                                :
                                <div className="flex flex-col items-center justify-center h-[400px] px-4">
                                    <p className="font-bold">Aún no has agregado nada.</p> 
                                    <p className="text-info">Si lo deseas puedes continuar, no es obligatorio añadir proyectos pero es recomendable añadir al menos 1.</p>
                                </div>
                            }
                        </section>
                        <div className="mt-auto flex justify-between">
                            <button type="button" className="btn btn-info" onClick={prevPhase}>Volver</button>
                            <button type="button" className="btn btn-warning" onClick={() => validate("projects")}>Continuar</button>
                        </div>
                    </section>
                }

                {
                    actualPhase === 5
                    &&
                    <section className="flex flex-col col-start-2 col-end-4">
                        <HeaderWithContentComponent level={3} title="¡Ya hemos terminado!" content="Verifica que la información sea correcta, pero no te preocupes si decides guardarla, podrás editarla cuando quieras."/>
                        <section className="mt-auto flex justify-between">
                            <button className="btn btn-info" type="button" onClick={prevPhase}>Volver</button>
                            <button type="submit" className="btn btn-success">Generar CV</button>
                        </section>
                    </section>
                }
            </div>
            {/* <button className="btn btn-info" type="submit">Generar CV</button> */}
        </form>
    );
}

export default CreateCvForm;