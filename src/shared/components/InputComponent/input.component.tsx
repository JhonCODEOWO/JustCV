import type { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputComponentProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    type: 'text' | 'number';
    validations?: RegisterOptions<T, Path<T>>;
}

function InputComponent<T extends FieldValues>({label,type, name, register, errors, validations = {}}: InputComponentProps<T>) {
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label}</legend>
                <input {...register(name, validations)} type={type} className="input" placeholder="Type here" />
                {/* {!validations.required && <p className="label">Optional</p>} */}
                {errors[name] && <span className="text-error text-xs">{String(errors[name].message)}</span>}
        </fieldset>
    );
}

export default InputComponent;