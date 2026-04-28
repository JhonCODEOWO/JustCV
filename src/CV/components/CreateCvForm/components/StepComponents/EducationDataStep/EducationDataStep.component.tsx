import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import EducationElementComponent from "../../EducationElement/EducationElement.component";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import type { Control, FieldArrayWithId, UseFieldArrayAppend, UseFormTrigger } from "react-hook-form";

interface EducationDataStepProps extends StepComponentProps<CreateCvFormBody>{
    fields: FieldArrayWithId<CreateCvFormBody, "education", "id">[],
    append: UseFieldArrayAppend<CreateCvFormBody, "education">
    trigger: UseFormTrigger<CreateCvFormBody>,
    control: Control<CreateCvFormBody>,
    onDeleteEducationElement: (id: number) => void;
}

function EducationDataStep({
  errors,
  register,
  validate,
  append,
  fields,
  control,
  trigger,
  prevPhase,
  onDeleteEducationElement
}: EducationDataStepProps) {

  return (
    <>
      <section className="flex flex-col items-center gap-x-5">
        <HeaderWithContentComponent
          title="Educación"
          content="Añade tus datos académicos"
          level={3}
          positionText="start"
        >
          <button
            className="btn btn-success"
            type="button"
            onClick={() =>
              append({
                graduationDate: "",
                institutionName: "",
                titleName: "",
                type: "curso",
              })
            }
          >
            Añadir nuevo
          </button>
        </HeaderWithContentComponent>
      </section>

      <section className="h-119 overflow-y-auto flex flex-col gap-y-3 py-2">
        <p className="text-error text-xs">{errors.education?.message}</p>
        {fields.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p>Aún no has añadido nada.</p>
          </div>
        )}
        {fields.map((education, index) => {
          return (
            <EducationElementComponent
              trigger={trigger}
              control={control}
              errors={errors}
              index={index}
              register={register}
              key={education.id}
              onDeleteEducationElement={onDeleteEducationElement}
            />
          );
        })}
      </section>
    </>
  );
}

export default EducationDataStep;
