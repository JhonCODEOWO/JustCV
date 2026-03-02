import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreateCvInterface } from "../../../../interfaces/CreateCVInterface";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";

interface EducationElementComponentProps {
    control: Control<CreateCvInterface>,
    errors: FieldErrors<CreateCvInterface>,
    index: number;
    register: UseFormRegister<CreateCvInterface>,
    onDeleteEducationElement: (id: number) => void;
}

function EducationElementComponent({control, errors, index, register, onDeleteEducationElement}: EducationElementComponentProps) {
  return (
    <div className="grid grid-cols-2 items-center justify-between border border-base-300 bg-base-200 p-3 rounded">
      <InputComponent<CreateCvInterface>
        errors={errors}
        name={`education.${index}.titleName`}
        register={register}
        label="Título Obtenido"
        type="text"
        validations={{
          required: {
            message: "Es necesario conocer el nombre de tu título",
            value: true,
          },
        }}
      />
      <InputComponent<CreateCvInterface>
        errors={errors}
        name={`education.${index}.institutionName`}
        register={register}
        label="Nombre de la institución"
        type="text"
        validations={{
          required: {
            message: "Es necesario conocer el nombre de la institución",
            value: true,
          },
        }}
      />
      <InputComponent<CreateCvInterface>
        errors={errors}
        name={`education.${index}.graduationDate`}
        register={register}
        label="Fecha de obtención"
        type="date"
        validations={{
          required: {
            message: "Es necesario conocer el nombre de tu título",
            value: true,
          },
        }}
      />
      <div className="col-span-2 text-end">
        <button
        type="button"
        className="btn btn-error"
        onClick={() => onDeleteEducationElement(index)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 18v-2h4v2zm0-8V8h7v2zm0 4v-2h6v2zM3 8H2V6h4V4.5h4V6h4v2h-1v9q0 .825-.587 1.413T11 19H5q-.825 0-1.412-.587T3 17z"/></svg>
      </button>
      </div>
    </div>
  );
}

export default EducationElementComponent;
