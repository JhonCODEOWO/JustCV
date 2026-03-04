import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import HeaderComponent from "../../../../../shared/components/HeaderComponent/HeaderComponent.component";
import type { CreateCvFormBody } from "../../CreateCvForm.component";

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
            <div className="grid grid-cols-3 h-39 overflow-y-auto justify-items-center items-center">
                {achievements.length === 0 && <p className="col-span-3">No has añadido nada todavía</p>}
                {achievements.map((achievement, indexAchievement) => {
                    return (
                        <div key={achievement.id} className="flex gap-x-3 items-center">
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
                            <button className="btn btn-warning" onClick={() => removeAchievement(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}

export default CreateAchievementComponent;