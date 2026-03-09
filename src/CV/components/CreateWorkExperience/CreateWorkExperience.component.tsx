import { useFieldArray, useForm, useWatch } from "react-hook-form";
import type { Achievement, WorkExperience } from "../../interfaces/CreateCVInterface";
import InputComponent from "../../../shared/components/InputComponent/input.component";
import CreateAchievementComponent from "../CreateCvForm/components/CreateAchievement/CreateAchievement.component";
import { useEffect } from "react";

interface CreateWorkExperienceComponentProps {
    data?: WorkExperience;
    onCreatedWorkExperience: (experience: WorkExperience) => void;
}

function CreateWorkExperienceComponent({data, onCreatedWorkExperience}: CreateWorkExperienceComponentProps) {
    console.log("WorkExperience mounted");
    const {formState: {errors, isValid}, register, getValues, control, trigger} = useForm<WorkExperience>(
        {
            mode: 'onChange',
            defaultValues: {
                companyName: data?.companyName ?? 'Nombre ejemplo',
                occupation: data?.occupation ?? '',
                startDate: data?.startDate ?? '',
                achievements: [],
            }
        }
    );

    const {achievements, companyName, occupation, startDate} = useWatch({control: control});

    const {append, remove, update, fields} = useFieldArray({control, name: 'achievements'});


    const onCreateClick = async () => {
        const validationPassed = await trigger();
    }

    const handleAchievementCreated = (ach: Achievement) =>{
        append(ach);
    }
    return ( 
        <div>
            <section className="flex justify-between">
                <div className="grid grid-cols-2 gap-3">
                    <InputComponent<WorkExperience> 
                    errors={errors}
                    label="Nombre de la compañía"
                    name="companyName"
                    register={register}
                    type="text"
                    validations={
                        {
                            required: {value: true, message: 'Es vital conocer el nombre de la empresa'},
                        }
                    }
                    />
                    <InputComponent<WorkExperience> 
                        errors={errors}
                        label="Ocupación desempeñada"
                        name="occupation"
                        register={register}
                        type="text"
                        validations={
                            {
                                required: {value: true, message: 'Es vital conocer la ocupación que desempeñaste'},
                            }
                        }
                    />
                    <InputComponent<WorkExperience> 
                        errors={errors}
                        label="Fecha de inicio"
                        name="startDate"
                        register={register}
                        type="date"
                    />
                    <div>
                        <CreateAchievementComponent onAchievementCreated={handleAchievementCreated}/>
                    </div>
                </div>

                <section>
                    <div>
                        <div>
                            <h2>{companyName} - <span>{startDate}</span></h2>
                            <p>{occupation}</p>
                        </div>
                        <div>
                            Logros destacables
                            {achievements?.map((achievement, index) => <p key={index}>{achievement.description}</p>)}
                        </div>
                    </div>
                </section>
            </section>
            <button type="button" className="btn btn-success" onClick={onCreateClick}>Crear experiencia laboral</button>
        </div>
     );
}

export default CreateWorkExperienceComponent;