import { useFieldArray, useForm, type FieldPath } from "react-hook-form";
import InputComponent from "../../../shared/components/InputComponent/input.component";
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
import PersonalDataStep from "./components/StepComponents/PersonalDataStep/PersonalDataStep.component";
import EducationDataStep from "./components/StepComponents/EducationDataStep/EducationDataStep.component";
import LaboralDataStep from "./components/StepComponents/LaboralDataStep/LaboralDataStep.component";
import SkillsLanguageStep from "./components/StepComponents/SkillsLanguageStep/SkillsLanguageStep.component";
import ProjectsStep from "./components/StepComponents/ProjectsStep/ProjectsStep.component";

//TODO: The useSteps hook should retrieve this values
export type StepID = "personalData" | "educationData" | "laboralData" | "skillsLanguage" | "finalPhase" | "projects";

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
                <section className="bg-base-100 p-5 rounded flex-1 h-full col-start-2 col-end-4">
                    {
                        actualPhase === 0
                        &&
                        <PersonalDataStep errors={errors} register={register} validate={validate}/>
                    }
                    {
                        actualPhase === 1
                        &&
                        <EducationDataStep 
                            append={append} 
                            control={control} 
                            errors={errors} 
                            fields={fields} 
                            register={register}
                            trigger={trigger}
                            validate={validate}
                            prevPhase={prevPhase}
                            onDeleteEducationElement={handleDeleteEducationElement}
                        />
                    }
                    {
                        actualPhase === 2
                        &&
                        <LaboralDataStep 
                            appendWorkExperience={appendWorkExperience}
                            control={control}
                            errors={errors}
                            onDeletedWorkElement={handleDeleteWorkExperienceElement}
                            register={register}
                            trigger={trigger}
                            validate={validate}
                            workExperienceFields={workExperienceFields}
                            prevPhase={prevPhase}
                        />
                    }
                    {
                        actualPhase === 3
                        &&
                        <SkillsLanguageStep 
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
                        />
                    }
                    {
                        actualPhase === 4
                        &&
                        <ProjectsStep
                            appendProject={appendProject}
                            errors={errors}
                            projects={projects}
                            register={register}
                            removeProject={removeProject}
                            validate={validate}
                            prevPhase={prevPhase}
                        />
                    }
                </section>
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
        </form>
    );
}

export default CreateCvForm;