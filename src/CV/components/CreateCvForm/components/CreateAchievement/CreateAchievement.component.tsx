import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import HeaderComponent from "../../../../../shared/components/HeaderComponent/HeaderComponent.component";
import type { CreateCvFormBody } from "../../schemas/CreateCVSchema";

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
                <HeaderComponent level={4}>
                Logros destacados
                </HeaderComponent>
                {/* Botón de creación */}
                <button type="button" className="btn btn-success rounded-full" onClick={() => appendAchievement({description: ''})} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                </button>
            </div>
            <p className="text-error text-xs text-center w-full">{errors.workExperience?.[index]?.achievements?.message}</p>
            {/* Renderización de elementos */}
            <div className="md:grid md:grid-cols-2 md:h-39 overflow-y-auto justify-items-center items-center">
                {achievements.length === 0 && <p className="col-span-3">No has añadido nada todavía</p>}
                {achievements.map((achievement, indexAchievement) => {
                    return (
                        <div key={achievement.id} className="flex flex-col gap-x-3 items-center">
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
                            <button className="text-xs underline text-error w-full text-start" type="button" onClick={() => removeAchievement(indexAchievement)}>
                                Quitar logro
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}

export default CreateAchievementComponent;