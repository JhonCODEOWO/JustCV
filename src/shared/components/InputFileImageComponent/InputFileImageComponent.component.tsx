import { useState } from "react";
import { get, type FieldErrors, type FieldValues, type Path, type UseFormRegister, type UseFormWatch } from "react-hook-form";

interface InputFileImageComponentProps<T extends FieldValues> {
    name: Path<T>;
    register: UseFormRegister<T>,
    errors: FieldErrors<T>,
    label?: string,
    watch: UseFormWatch<T>
}

function InputFileImageComponent<T extends FieldValues>({errors, label = 'Seleccionar imagen', name, register, watch}: InputFileImageComponentProps<T>) {
    const [hover, setHover] = useState<boolean>(false);
    const imagesSelected: FileList | undefined = watch(name);
    const file = imagesSelected?.[0];
    const previewUrl: string | null = file? URL.createObjectURL(file): null;
    const error = get(errors, name);

    return (
        <div className="block w-[200px]">
            <label className="fieldset-legend text-xs">{label}</label>
            <fieldset className={`fieldset relative rounded h-50 w-full`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {previewUrl && <img src={previewUrl } alt="" className="absolute h-full w-full"/>}
                <div className={`absolute h-full w-full transition-colors ${hover? 'bg-base-200': ''}`}></div>
                    <legend className={`flex justify-center items-center absolute h-full w-full transition-opacity ${hover || !previewUrl? 'opacity-100': 'opacity-0'}`}>Seleccionar imagen(es)</legend>
                    <input type="file" {...register(name)} className="opacity-0 h-full absolute w-full cursor-pointer"/>
            </fieldset>
            <section className="flex flex-col">
                {error && <label className="text-error text-xs">{error.message}</label>}
                <label className="label">Max size 2MB</label>
            </section>
        </div>
    );
}

export default InputFileImageComponent;