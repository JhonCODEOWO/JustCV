import { get, type FieldErrors, type FieldValues, type Path, type UseFormRegister } from "react-hook-form";

export interface SelectOpt {
    label: string;
    value: string;
}

interface SelectComponentProps<T extends FieldValues>{
    label: string;
    register: UseFormRegister<T>;
    name: Path<T>;
    selectOptions: SelectOpt[];
    isOptional: boolean,
    errors: FieldErrors<T>
}

function SelectComponent<T extends FieldValues>({label, register, name, selectOptions = [], isOptional, errors}: SelectComponentProps<T>){
    const error = get(errors, name);
    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label} {!isOptional && <span className="text-error">*</span>} </legend>
                <select id={name} {...register(name)} className={`select outline-0 cursor-pointer w-full border ${error? 'border-error' : 'border-success'}`}>
                    <option disabled>Selecciona una opción</option>
                    {
                        selectOptions.map(({label, value}, index) => <option key={index} value={value}>{label}</option>)
                    }
                </select>
            {error && <span className="text-error text-xs">{error.message}</span>}
            {isOptional && <span className="label">Optional</span>}
        </fieldset>
    );
}

export default SelectComponent;