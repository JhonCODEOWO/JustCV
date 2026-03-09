import { useForm } from "react-hook-form";
import type { Education, EducationTypes } from "../../interfaces/CreateCVInterface";
import InputComponent from "../../../shared/components/InputComponent/input.component";
import { useEffect } from "react";

interface CreateEducationProps {
    data?: Education;
    onEducationCreated: (education: Education) => void;
}

const educationTypes: EducationTypes[] = ["curso", "titulo"];

function CreateEducation({onEducationCreated, data}: CreateEducationProps) {
    const {formState: {errors}, trigger, register, getValues, reset} = useForm<Education>({
        defaultValues: {
            graduationDate: data?.graduationDate ?? 'dasdsa',
            institutionName: data?.institutionName ?? '',
            titleName: data?.titleName ?? '',
            type: data?.type ?? 'curso'
        },
        mode: 'onChange'
    });

    useEffect(() => {
        reset(data)
    }, [data, reset])

    const createEducation = async  () => {
        const validated = await trigger();
        if(!validated) return;
        onEducationCreated(getValues());
        reset({graduationDate: '', institutionName: '', titleName: '', type: 'curso'});
    }

    return (
        <div className="grid grid-cols-2">
            <InputComponent<Education>
                errors={errors} 
                label="Nombre de la institución" 
                name="institutionName" 
                register={register} 
                type="text"
                validations={
                    {
                        required: {message: 'Es necesario el nombre de la institución', value: true}
                    }
                }
            />
            <InputComponent<Education>
                errors={errors} 
                label="Título obtenido" 
                name="titleName" 
                register={register} 
                type="text"
                validations={
                    {
                        required: {message: 'Es necesario conocer el nombre del título', value: true}
                    }
                }
            />

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Tipo de educación</legend>
                <select className="select" {...register("type", {})}>
                    <option disabled>Selecciona el tipo de educación:</option>
                    {educationTypes.map((educationType, index) => <option key={index} value={educationType}>{educationType.toUpperCase()}</option>)}
                </select>
            </fieldset>

            <InputComponent<Education>
                errors={errors} 
                label="Fecha de obtención" 
                name="graduationDate" 
                register={register} 
                type="date"
                validations={
                    {
                        required: {message: 'Es necesario conocer el nombre del título', value: true}
                    }
                }
            />

            <button type="button" className="btn btn-info col-span-2 mt-5" onClick={() => createEducation()}>Crear elemento</button>
        </div>
    );
}

export default CreateEducation;