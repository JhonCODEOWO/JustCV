import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import WorkExperienceElementComponent from "../../WorkExperienceElement/WorkExperienceElement.component";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";
import ErrorTextComponent from "../../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";

interface LaboralDataStepProps extends StepComponentProps<CreateCvFormBody> {
  appendWorkExperience: UseFieldArrayAppend<CreateCvFormBody, "workExperience">;
  workExperienceFields: FieldArrayWithId<
    CreateCvFormBody,
    "workExperience",
    "id"
  >[];
  control: Control<CreateCvFormBody>;
  onDeletedWorkElement: (id: number) => void;
}

function LaboralDataStep({
  appendWorkExperience,
  workExperienceFields,
  errors,
  register,
  control,
  onDeletedWorkElement
}: LaboralDataStepProps) {
  return (
    <>
      <div className="bg-base-100 rounded w-full">
        <div className="mb-3">
          <HeaderWithContentComponent
          title="Experiencia laboral"
          content="Añade tu experiencia laboral"
          level={3}
          positionText="start"
          />
        </div>

        <section className="flex flex-col gap-3 rounded">
          
          {errors.workExperience && (
            <p className="text-error text-xs col-span-2">
              {errors.workExperience.message}
            </p>
          )}
          
          {workExperienceFields.length === 0
            ?
              (
                <div className="w-full text-center col-span-2 flex flex-col items-center gap-y-3">
                  <p>Sin experiencias laborales añadidas</p>
                  <button 
                    className="btn btn-soft w-fit"
                    onClick={() =>
                            appendWorkExperience({
                                achievements: [],
                                companyName: "",
                                occupation: "",
                                startDate: "",
                                endDate: "",
                              })
                            }
                  >
                    Pulsa aquí para añadir el primero.
                  </button>
                </div>
              )
            :
              <>
                {errors.workExperience && <ErrorTextComponent error="Asegúrate de corregir todos los errores de las experiencias laborales."/>}
                {workExperienceFields.map((experience, index) => (
                  <WorkExperienceElementComponent
                      control={control}
                      errors={errors}
                      index={index}
                      onDeleteWorkExperienceElement={
                        onDeletedWorkElement
                      }
                      register={register}
                      key={experience.id}
                    />
                ))}
                <button
                    type="button"
                    className="btn btn-soft"
                    onClick={() =>
                      appendWorkExperience({
                        achievements: [],
                        companyName: "",
                        occupation: "",
                        startDate: "",
                        endDate: "",
                      })
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                    Añadir nueva experiencia laboral
                  </button>
              </>
          }
        </section>
      </div>
    </>
  );
}

export default LaboralDataStep;
