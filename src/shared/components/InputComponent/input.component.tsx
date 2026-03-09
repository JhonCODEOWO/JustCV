import { get, type FieldErrors, type FieldValues, type Path, type RegisterOptions, type UseFormRegister } from "react-hook-form";

interface InputComponentProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    type: 'text' | 'number' | 'date';
    validations?: RegisterOptions<T, Path<T>>;
}

function InputComponent<T extends FieldValues>({label,type, name, register, errors, validations = {}}: InputComponentProps<T>) {
    const required: boolean = Object.keys(validations).includes('required');
    const error = get(errors, name);
    const globalInputClasses = 'input outline-0';
    const errorClasses = (error)? 'border border-error': '';
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend flex items-center">{label} {required && <p className="label text-error">*</p>}</legend>
                <input {...register(name, validations)} type={type} className={`${globalInputClasses} ${errorClasses}`} placeholder="Type here" />
                {!required && <p className="label">Opcional</p>}
                {error && <span className="text-error text-xs">{String(error.message)}</span>}
        </fieldset>
    );
}

export default InputComponent;