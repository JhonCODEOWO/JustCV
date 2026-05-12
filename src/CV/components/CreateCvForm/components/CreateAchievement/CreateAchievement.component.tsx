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
            </div>
            <p className="text-error text-xs text-center w-full">{errors.workExperience?.[index]?.achievements?.message}</p>
            {/* Renderización de elementos */}
            <div className="md:grid md:grid-cols-2 justify-items-center items-center">
                {achievements.length === 0 
                    && 
                    <section className="col-span-3">
                        <p>
                            No has añadido nada todavía
                        </p>
                        <button type="button" className="btn btn-success rounded-full md:col-span-2" onClick={() => appendAchievement({description: ''})} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                            Añadir nuevo
                        </button>
                    </section>
                }
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
                            <button className="text-xs underline text-error text-start" type="button" onClick={() => removeAchievement(indexAchievement)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                            </button>
                        </div>
                    )
                })}
                {achievements.length > 0 && (
                    <button type="button" className="btn btn-success rounded-full md:col-span-2" onClick={() => appendAchievement({description: ''})} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                        Añadir nuevo
                    </button>
                )}
            </div>
        </div>
     );
}

export default CreateAchievementComponent;