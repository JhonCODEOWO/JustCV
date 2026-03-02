import { useForm, type FieldErrors, type FieldValues, type UseFormRegister } from "react-hook-form";
import type { CreateCvInterface, Education, EducationTypes } from "../../interfaces/CreateCVInterface";
import InputComponent from "../../../shared/components/InputComponent/input.component";

interface CreateEducationElementProps {
    register: UseFormRegister<CreateCvInterface>,
    errors: FieldErrors<CreateCvInterface>
    onCreateEducationElement: () => void;
}

const educationTypes: EducationTypes[] = ["curso", "titulo"];


function CreateEducationElement({onCreateEducationElement, register, errors}: CreateEducationElementProps) {
    return (
        <div>
            <InputComponent<CreateCvInterface>
                errors={errors} 
                label="Nombre de la institución" 
                name="educationDraft.institutionName" 
                register={register} 
                type="text"
                validations={
                    {
                        required: {message: 'Es necesario el nombre de la institución', value: true}
                    }
                }
            />
            <InputComponent<CreateCvInterface>
                errors={errors} 
                label="Título obtenido" 
                name="educationDraft.titleName" 
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
                <select className="select" {...register("educationDraft.type", {})}>
                    <option disabled>Selecciona el tipo de educación:</option>
                    {educationTypes.map((educationType, index) => <option key={index} value={educationType}>{educationType.toUpperCase()}</option>)}
                </select>
            </fieldset>

            <InputComponent<CreateCvInterface>
                errors={errors} 
                label="Fecha de obtención" 
                name="educationDraft.graduationDate" 
                register={register} 
                type="date"
                validations={
                    {
                        required: {message: 'Es necesario conocer el nombre del título', value: true}
                    }
                }
            />

            <button type="button" onClick={onCreateEducationElement} className="btn btn-info">Crear elemento</button>
        </div>
    );
}

export default CreateEducationElement;