import { get, type FieldErrors, type FieldValues, type Path, type RegisterOptions, type UseFormRegister } from "react-hook-form";
import { useViewPortContext } from "../../utils/contexts/ViewPortContext/ViewPortContextHook";
import ErrorTextComponent from "../ErrorTextComponent/ErrorTextComponent.component";

interface InputComponentProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    type: 'text' | 'number' | 'date';
    validations?: RegisterOptions<T, Path<T>>;
}

function InputComponent<T extends FieldValues>({label,type, name, register, errors, validations = {}}: InputComponentProps<T>) {
    const {deviceType} = useViewPortContext();
    const required: boolean = Object.keys(validations).includes('required');
    const error = get(errors, name);
    const globalInputClasses = 'input outline-0 w-full';
    const errorClasses = (error)? 'border':(error)? 'border border-error': '';

    if(deviceType === 'smartphone' || deviceType === 'tablet') return (
        <div className="flex flex-col w-full">
            <div className="relative my-1.5">
                <input 
                    type={type} 
                    {...register(name, validations)}  
                    className={`${globalInputClasses} block peer`} placeholder=" " />
                <label 
                    htmlFor={name} 
                    className="
                        pointer-events-none
                        absolute 
                        bg-base-100 
                        peer-focus:bg-base-200 
                        text-xs 
                        text-body 
                        duration-300 
                        transform 
                        -translate-y-5 
                        scale-75 
                        top-3 
                        z-10 
                        origin-left 
                        start-2.5 
                        peer-focus:text-fg-brand 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 
                        peer-focus:-translate-y-5 
                        rtl:peer-focus:translate-x-1/4 
                        rtl:peer-focus:left-auto"
                >
                    {label}
                    {required && <p className="label text-error">*</p>}
                </label>
            </div>
            {error && <ErrorTextComponent error={String(error.message)}/>}
        </div>
    )

    return (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend flex items-center">{label} {required && <p className="label text-error">*</p>}</legend>
                <input {...register(name, validations)} type={type} className={`${globalInputClasses} ${errorClasses}`} placeholder="Type here" />
                {!required && <p className="label">Opcional</p>}
                {error && <span className="text-error text-xs">{String(error.message)}</span>}
        </fieldset>
    );
}

export default InputComponent;