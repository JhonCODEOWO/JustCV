import { get, useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import { Education, type CreateCvFormBody } from "../../schemas/CreateCVSchema";
import FieldArrayElementComponent from "../../../../../shared/components/FieldArrayElementComponent/FieldArrayElementComponent";



interface EducationElementComponentProps {
    control: Control<CreateCvFormBody>,
    errors: FieldErrors<CreateCvFormBody>,
    index: number;
    register: UseFormRegister<CreateCvFormBody>,
    onDeleteEducationElement: (id: number) => void;
}

/**
 * Individual component to fill fields data about Education based on a array element by index
 * @param param0 
 * @returns 
 */
function EducationElementComponent({control, errors, index, register, onDeleteEducationElement}: EducationElementComponentProps) {
  const values = useWatch({control: control, name: `education.${index}`});
  const title = [values.titleName, values.graduationDate].filter(value => value.trim().length > 0).join(' | ') || 'Título | Fecha de Obtención'
  const selectError = get(errors, `education.${index}.type`); //Get the error for the path field type

  const handleCollapse = async () => {
    
  }

  return (
    <FieldArrayElementComponent
      onDelete={() => onDeleteEducationElement(index)}
      onCollapse={handleCollapse}
      isValid={Education.safeParse(values).success}
      index={index}
      title={title}
    >
      <div className="p-3">
        <section className="flex flex-col md:grid md:grid-cols-2 md:items-center md:justify-between">
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
          </section>
      </div>
    </FieldArrayElementComponent>
    
  );
}

export default EducationElementComponent;
