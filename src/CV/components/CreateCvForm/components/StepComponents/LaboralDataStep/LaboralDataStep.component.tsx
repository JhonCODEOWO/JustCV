import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import WorkExperienceElementComponent from "../../WorkExperienceElement/WorkExperienceElement.component";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormTrigger,
} from "react-hook-form";

interface LaboralDataStepProps extends StepComponentProps<CreateCvFormBody> {
  appendWorkExperience: UseFieldArrayAppend<CreateCvFormBody, "workExperience">;
  workExperienceFields: FieldArrayWithId<
    CreateCvFormBody,
    "workExperience",
    "id"
  >[];
  trigger: UseFormTrigger<CreateCvFormBody>;
  control: Control<CreateCvFormBody>;
  onDeletedWorkElement: (id: number) => void;
}

function LaboralDataStep({
  appendWorkExperience,
  workExperienceFields,
  errors,
  register,
  validate,
  prevPhase,
  control,
  trigger,
  onDeletedWorkElement
}: LaboralDataStepProps) {
  return (
    <>
      <div className="bg-base-100 p-4 rounded w-full">
        <HeaderWithContentComponent
          title="Experiencia laboral"
          content="Añade tu experiencia laboral"
          level={3}
          positionText="start"
          className="mb-4"
        >
          <button
            type="button"
            className="btn btn-success"
            onClick={() =>
              appendWorkExperience({
                achievements: [],
                companyName: "",
                occupation: "",
                startDate: "",
              })
            }
          >
            Añadir experiencia laboral
          </button>
        </HeaderWithContentComponent>

        <section className="flex flex-col gap-3 rounded">
          {errors.workExperience && (
            <p className="text-error text-xs col-span-2">
              {errors.workExperience.message}
            </p>
          )}
          {workExperienceFields.length === 0 && (
            <p className="w-full text-center col-span-2">
              Sin experiencias laborales añadidas
            </p>
          )}
          {workExperienceFields.map((experience, index) => {
            return (
              <WorkExperienceElementComponent
                trigger={trigger}
                control={control}
                errors={errors}
                index={index}
                onDeleteWorkExperienceElement={
                  onDeletedWorkElement
                }
                register={register}
                key={experience.id}
              />
            );
          })}
        </section>
        <button className="btn btn-info" type="button" onClick={prevPhase}>
          Volver
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={() => validate("laboralData")}
        >
          Continuar
        </button>
      </div>
    </>
  );
}

export default LaboralDataStep;
