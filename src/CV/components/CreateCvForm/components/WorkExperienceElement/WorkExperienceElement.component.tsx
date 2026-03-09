import { useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormTrigger } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import CreateAchievementComponent from "../CreateAchievement/CreateAchievement.component";
import HeaderWithContentComponent from "../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import type { CreateCvFormBody } from "../../CreateCvForm.component";
import ShowHideContentComponent from "../../../../../shared/components/EditingContentComponent/EditingContentComponent.component";
import EditingContentComponent from "../../../../../shared/components/EditingContentComponent/EditingContentComponent.component";
import { useState } from "react";

interface WorkExperienceComponentProps {
  control: Control<CreateCvFormBody>;
  errors: FieldErrors<CreateCvFormBody>;
  index: number;
  register: UseFormRegister<CreateCvFormBody>;
  trigger: UseFormTrigger<CreateCvFormBody>;
  onDeleteWorkExperienceElement: (id: number) => void;
}

/**
 * Individual components to fill field data about WorkExperience based on a item inside a fieldArray.
 * @param param0 
 * @returns 
 */
function WorkExperienceElementComponent({trigger, errors, register, index, control, onDeleteWorkExperienceElement}: WorkExperienceComponentProps) {
  const {companyName, occupation, achievements} = useWatch({control, name: `workExperience.${index}`});
  const [editing, setEditing] = useState(true);

  const handleAccept = async () => {
    const validWorkExperience = await trigger(`workExperience.${index}`);
    if(!validWorkExperience) return;
    setEditing(false);
  }
  const handleEdit = () => {
    setEditing(true)
  }

  return (
    <>
      <EditingContentComponent 
        headerContent={
          <>
            {companyName} - {occupation}
          </>
        } 
        editing={editing} 
        onAccept={handleAccept} 
        onEdit={handleEdit}>
            <div className="relative bg-base-200 border border-base-300 p-4">
              <div className="grid grid-cols-3 gap-x-3 items-center justify-items-center">
                <HeaderWithContentComponent positionText="center" className="col-span-3 mb-3" content="Información de tu experiencia laboral" level={4} title="Datos de la empresa" />
                <InputComponent
                  errors={errors}
                  label="Nombre de la empresa"
                  name={`workExperience.${index}.companyName`}
                  register={register}
                  validations={{
                    required: {
                      message: "Es necesario el nombre de la compañía/empresa",
                      value: true,
                    },
                  }}
                  type="text"
                />

                <InputComponent
                  errors={errors}
                  label="Fecha de inicio"
                  name={`workExperience.${index}.startDate`}
                  register={register}
                  validations={{
                    required: {
                      message: "La descripción de la ocupación es obligatoria",
                      value: true,
                    },
                  }}
                  type="date"
                />
                <InputComponent
                  errors={errors}
                  label="Cargo desempeñado"
                  name={`workExperience.${index}.occupation`}
                  register={register}
                  validations={{
                    required: {
                      message: "La descripción de la ocupación es obligatoria",
                      value: true,
                    },
                  }}
                  type="text"
                />
              </div>

              <div className="mt-4">
                <CreateAchievementComponent
                  control={control}
                  index={index}
                  errors={errors}
                  register={register}
                />
              </div>

              <button
                onClick={() => onDeleteWorkExperienceElement(index)}
                type="button"
                className="absolute top-0 right-0 z-50 btn btn-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                  />
                </svg>
              </button>
            </div>
      </EditingContentComponent>
    </>
  );
}

export default WorkExperienceElementComponent;
