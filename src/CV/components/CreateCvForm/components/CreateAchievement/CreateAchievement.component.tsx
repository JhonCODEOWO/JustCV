import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import HeaderComponent from "../../../../../shared/components/HeaderComponent/HeaderComponent.component";
import type { CreateCvFormBody } from "../../schemas/CreateCVSchema";
import ErrorTextComponent from "../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";

interface CreateAchievementComponentProps {
    /**
     * The index of the element is used to make the name of access
     */
    index: number,
    /**
     * Control of the userForm
     */
    control: Control<CreateCvFormBody>,

    /**
     * Object of errors to show it based in the name of inputs
     */
    errors: FieldErrors<CreateCvFormBody>,

    /**
     * Register from a useForm to register input elements
     */
    register: UseFormRegister<CreateCvFormBody>
}

function CreateAchievementComponent({index, control, errors, register}: CreateAchievementComponentProps) {
    const {append: appendAchievement, remove: removeAchievement, fields: achievements} = useFieldArray({control, name:`workExperience.${index}.achievements`})

    return ( 
        <div>
            {/* Header del componente */}
            <div className="flex items-center justify-center gap-x-3 mb-4">
                <HeaderComponent level={4} className="flex flex-col justify-center">
                    Logros destacados
                    <ErrorTextComponent error={errors.workExperience?.[index]?.achievements?.message ?? ''}/>
                </HeaderComponent>
            </div>
            {/* Renderización de elementos */}
            <div className="p-3 justify-items-center items-center bg-base-300">
                {achievements.length === 0 
                    ? 
                    <section className="col-span-3 flex flex-col items-center py-3">
                        <p className="text-">
                            No has añadido nada todavía
                        </p>
                        <button type="button" className="btn btn-soft rounded-full md:col-span-2 mt-3" onClick={() => appendAchievement({description: ''})} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                            Añadir nuevo
                        </button>
                    </section>
                    :
                    <>
                        {achievements.map((achievement, indexAchievement) => {
                            return (
                                <div key={achievement.id} className="flex my-1.5 items-stretch bg-base-200 rounded overflow-hidden">
                                    <div className="p-3 w-full">
                                        <InputComponent<CreateCvFormBody> 
                                            errors={errors} 
                                            label="Descripción del logro" 
                                            name={`workExperience.${index}.achievements.${indexAchievement}.description`} 
                                            register={register}
                                            type="text"
                                            key={achievement.id}
                                            validations={
                                                {
                                                    required: {value: true, message: 'Es necesario describir el logro'}
                                                }
                                            }
                                        />
                                    </div>
                                    <button className="bg-error" type="button" onClick={() => removeAchievement(indexAchievement)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}
                        <button 
                            type="button" 
                            className="btn btn-soft w-full mt-3" 
                            onClick={() => appendAchievement({description: ''})}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                            Añadir logro destacado
                        </button>
                    </>
                }
            </div>
        </div>
     );
}

export default CreateAchievementComponent;