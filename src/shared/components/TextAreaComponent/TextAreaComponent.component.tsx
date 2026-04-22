import { get, type FieldErrors, type FieldValues, type Path, type UseFormRegister } from "react-hook-form";
import ErrorTextComponent from "../ErrorTextComponent/ErrorTextComponent.component";

interface TextAreaComponentProps<T extends FieldValues> {
    register: UseFormRegister<T>,
    name: Path<T>,
    label: string,
    placeholder?: string;
    errors: FieldErrors<T>,
    required: boolean,
}

function TextAreaComponent<T extends FieldValues>({register, name, label, errors, required, placeholder = ''}:TextAreaComponentProps<T>) {
    const error = get(errors, name);
    return ( 
        <fieldset className="fieldset">
            <legend className="fieldset-legend">
                {label}
                {required && <ErrorTextComponent error="*"/>}
            </legend>
            <textarea 
                className={`textarea h-24 w-full outline-0 ${error ? 'border border-error' : 'border border-success'}`}
                placeholder={placeholder}
                {...register(name)}
            >

            </textarea>
            {error && <ErrorTextComponent error={error.message}/>}
        </fieldset>
    );
}

export default TextAreaComponent;