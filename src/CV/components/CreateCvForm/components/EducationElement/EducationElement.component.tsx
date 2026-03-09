import { get, useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormTrigger } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import type { CreateCvFormBody } from "../../CreateCvForm.component";
import HeaderComponent from "../../../../../shared/components/HeaderComponent/HeaderComponent.component";
import { useState } from "react";
import EditingContentComponent from "../../../../../shared/components/EditingContentComponent/EditingContentComponent.component";



interface EducationElementComponentProps {
    control: Control<CreateCvFormBody>,
    errors: FieldErrors<CreateCvFormBody>,
    index: number;
    register: UseFormRegister<CreateCvFormBody>,
    trigger: UseFormTrigger<CreateCvFormBody>
    onDeleteEducationElement: (id: number) => void;
}

/**
 * Individual component to fill fields data about Education based on a array element by index
 * @param param0 
 * @returns 
 */
function EducationElementComponent({control, errors, index, register, onDeleteEducationElement, trigger}: EducationElementComponentProps) {
  const {graduationDate, institutionName, titleName, type} = useWatch({control: control, name: `education.${index}`});
  const [editing, setEditing] = useState(true); //Editing mode
  const selectError = get(errors, `education.${index}.type`); //Get the error for the path field type
  
  const handleAccept = async () => {
    const validEducation = await trigger(`education.${index}`);
    if(!validEducation) return;
    setEditing(false);
  }

  return (
    <EditingContentComponent
      headerContent={
        <>
          {titleName} - <span>{institutionName}</span> - <span>{graduationDate}</span>
        </>
      }
      onAccept={handleAccept}
      onEdit={() =>setEditing(true)}
      editing={editing}
      >
      <div className="border border-base-300 bg-base-200 p-3 rounded">
        <section className="grid grid-cols-2 items-center justify-between">
              <InputComponent<CreateCvFormBody>
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
              <InputComponent<CreateCvFormBody>
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
              <InputComponent<CreateCvFormBody>
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

              {/* This is a required new component */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Obtención de la formación académica</legend>
                <select className="select outline-0" {...register(`education.${index}.type`)}>
                  <option disabled>Selecciona el tipo de educación obtenido</option>
                  <option value='titulo'>Título</option>
                  <option value='curso'>Curso</option>
                  <option value='abc'>Something</option>
                </select>
                {selectError && <p className="text-xs text-error">{selectError.message}</p>}
              </fieldset>
              <div className="col-span-2 text-end">
                <button
                type="button"
                className="btn btn-error"
                onClick={() => onDeleteEducationElement(index)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 18v-2h4v2zm0-8V8h7v2zm0 4v-2h6v2zM3 8H2V6h4V4.5h4V6h4v2h-1v9q0 .825-.587 1.413T11 19H5q-.825 0-1.412-.587T3 17z"/></svg>
              </button>
            </div>
          </section>
      </div>
    </EditingContentComponent>
  );
}

export default EducationElementComponent;
