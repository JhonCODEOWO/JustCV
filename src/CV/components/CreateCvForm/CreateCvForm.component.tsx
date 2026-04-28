import { useFieldArray, useForm, type FieldPath } from "react-hook-form";
import HeaderWithContentComponent from "../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { CreateCVSchema, type CreateCvFormBody } from "./schemas/CreateCVSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSteps } from "../../../shared/hooks/FormSteps/FormSteps";
import StepsTimelineComponent from "../../../shared/hooks/FormSteps/Components/StepsTimelineComponent/StepsTimelineComponent.component";
import type { Step } from "../../../shared/hooks/FormSteps/interfaces/StepInterface.interface";
import { useNavigate } from "react-router-dom";
import { useCvsContext } from "../../contexts/CvsContext/hooks/CvsContextHook";
import PersonalDataStep from "./components/StepComponents/PersonalDataStep/PersonalDataStep.component";
import EducationDataStep from "./components/StepComponents/EducationDataStep/EducationDataStep.component";
import LaboralDataStep from "./components/StepComponents/LaboralDataStep/LaboralDataStep.component";
import SkillsLanguageStep from "./components/StepComponents/SkillsLanguageStep/SkillsLanguageStep.component";
import ProjectsStep from "./components/StepComponents/ProjectsStep/ProjectsStep.component";
import { useEffect, type JSX } from "react";
import CertificationsDataStep from "./components/StepComponents/CertificationsDataStep/CertificationsDataStep.component";

//TODO: The useSteps hook should retrieve this values
export type StepID = "personalData" | "educationData" | "laboralData" | "skillsLanguage" | "finalPhase" | "projects" | "certifications";

interface CreateCvFormProps{
    cv?: CreateCvFormBody | null,
    id?: string | null,
}

function CreateCvForm({cv, id}: CreateCvFormProps) {
    const navigate = useNavigate();
    const {addCv} = useCvsContext();
    const {actualPhase, nextPhase, prevPhase, totalPhases, goTo, elementsBefore, actualStepElement} = useSteps([
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
            id: 'certifications',
            title: 'Certificaciones.'
        },
        {
            id: 'finalPhase',
            title: 'Finalizar proceso'
        }
    ]);
    
    const { register, handleSubmit, trigger, watch, control,formState: {errors, isSubmitted, isDirty, isValid, dirtyFields, touchedFields}, resetField, setError, clearErrors, getValues, reset} = useForm<CreateCvFormBody>({
        mode: 'onChange',
        defaultValues: {
            fullname: '',
            email: '',
            phoneNumber: ``,
            resume: ``,
            education: [],
            profesionalLinks: {github: '', linkedIn: '', portfolioWeb: ''},
            residence: {city: '', country: ''},
            workExperience: [],
        },
        resolver: zodResolver(CreateCVSchema)
    });

    useEffect(() => {
        if(cv) reset(cv);
    }, [cv, reset])

    /**
     * Field values separated by a ID to indicate what fields should validate in each step
     */
    const fieldsByStep: Record<StepID, FieldPath<CreateCvFormBody>[]> = {
            personalData: ["fullname", "email", "phoneNumber", "profesionalLinks", "residence", "resume"],
            educationData: ["education"],
            laboralData: ["workExperience"],
            skillsLanguage: ["skills", "languages"],
            projects: ["projects"],
            certifications: ["certifications"],
            finalPhase: []
    }

    const {append, remove, fields} = useFieldArray({control, name: 'education'});
    const {append: appendWorkExperience, remove: removeWorkExperience, fields: workExperienceFields} = useFieldArray({control, name: 'workExperience'});
    const {fields: languages, append: appendLanguage, remove: removeLanguage} = useFieldArray({control, name: 'languages'});
    const {fields: skills, append: appendSkill, remove: removeSkill} = useFieldArray({control, name: 'skills'});
    const { fields: projects, append: appendProject, remove: removeProject } = useFieldArray({control, name: 'projects'});
    const {append: appendCertification, remove: removeCertification, fields: certifications} = useFieldArray({control, name: 'certifications'});

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

        /**TODO: DIFERENCIAR ENTRE MODO EDICIÓN O CREACIÓN */
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

    const stepsRenders: Record<StepID, JSX.Element> = {
        'personalData': <PersonalDataStep errors={errors} register={register} validate={validate}/>,
        'educationData': <EducationDataStep 
                            append={append} 
                            control={control} 
                            errors={errors} 
                            fields={fields} 
                            register={register}
                            trigger={trigger}
                            validate={validate}
                            prevPhase={prevPhase}
                            onDeleteEducationElement={handleDeleteEducationElement}
                        />,
        'laboralData': <LaboralDataStep 
                            appendWorkExperience={appendWorkExperience}
                            control={control}
                            errors={errors}
                            onDeletedWorkElement={handleDeleteWorkExperienceElement}
                            register={register}
                            trigger={trigger}
                            validate={validate}
                            workExperienceFields={workExperienceFields}
                            prevPhase={prevPhase}
                        />,
        'skillsLanguage': <SkillsLanguageStep 
                            appendLanguage={appendLanguage} 
                            appendSkill={appendSkill} 
                            control={control} 
                            errors={errors} 
                            languages={languages} 
                            register={register} 
                            removeLanguage={removeLanguage} 
                            removeSkill={removeSkill} 
                            skills={skills} 
                            validate={validate} 
                            prevPhase={prevPhase}
                        />,
        'projects': <ProjectsStep
                            appendProject={appendProject}
                            errors={errors}
                            projects={projects}
                            register={register}
                            removeProject={removeProject}
                            validate={validate}
                            prevPhase={prevPhase}
                        />,
        'finalPhase': <>
                        <HeaderWithContentComponent level={3} title="¡Ya hemos terminado!" content="Verifica que la información sea correcta, pero no te preocupes si decides guardarla, podrás editarla cuando quieras."/>
                        <section className="mt-auto flex justify-between">
                            <button className="btn btn-info" type="button" onClick={prevPhase}>Volver</button>
                            <button type="submit" className="btn btn-success">Generar CV</button>
                        </section>
                    </>,
        'certifications': <CertificationsDataStep 
                            appendCertification={appendCertification} 
                            certifications={certifications}
                            errors={errors}
                            register={register}
                            removeCertification={removeCertification}
                            validate={validate}
                            prevPhase={prevPhase}
                            />
    }
    
    return (
        <form onSubmit={(event) => onSubmit(event)} className="flex gap-y-6 justify-center">
            <div className="gap-x-4 grid grid-cols-3 w-[65%] h-[500px] relative">
                <StepsTimelineComponent actualPhase={actualPhase} steps={totalPhases} onStepWanted={handleWantedStep} className="h-full"/>
                <div className="col-start-2 col-end-4 bg-base-100 rounded">
                    <section className="h-[450px] overflow-auto">
                    {
                        stepsRenders[actualStepElement.id as StepID]
                    }
                    </section>
                    <div className="flex justify-between">
                        <button className="btn btn-info" type="button" onClick={prevPhase} disabled={actualPhase === 0}>
                        Volver
                        </button>
                        <button
                            className="btn btn-warning"
                            type="button"
                            onClick={() => validate(actualStepElement.id as StepID)}
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CreateCvForm;