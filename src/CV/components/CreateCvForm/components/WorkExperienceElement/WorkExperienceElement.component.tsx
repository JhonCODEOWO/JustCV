import { useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import CreateAchievementComponent from "../CreateAchievement/CreateAchievement.component";
import HeaderWithContentComponent from "../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { WorkExperience, type CreateCvFormBody } from "../../schemas/CreateCVSchema";
import FieldArrayElementComponent from "../../../../../shared/components/FieldArrayElementComponent/FieldArrayElementComponent";

interface WorkExperienceComponentProps {
  control: Control<CreateCvFormBody>;
  errors: FieldErrors<CreateCvFormBody>;
  index: number;
  register: UseFormRegister<CreateCvFormBody>;
  onDeleteWorkExperienceElement: (id: number) => void;
}

/**
 * Individual components to fill field data about WorkExperience based on a item inside a fieldArray.
 * @param param0 
 * @returns 
 */
function WorkExperienceElementComponent({errors, register, index, control, onDeleteWorkExperienceElement}: WorkExperienceComponentProps) {
  const values = useWatch({control, name: `workExperience.${index}`});
  const titleElement = [values.companyName, values.occupation].filter(val => val.trim().length > 0).join('-') ||  'Sin título - Sin ocupación';

  return (
    <>
      <FieldArrayElementComponent
        index={index}
        isValid={WorkExperience.safeParse(values).success}
        onDelete={onDeleteWorkExperienceElement}
        title={titleElement}
      >
        <div className="p-4">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-x-3 justify-items-center">
                
                <HeaderWithContentComponent 
                  positionText="center" 
                  className="col-span-2 mb-3" 
                  content="Información de tu experiencia laboral" 
                  level={4} 
                  title="Datos de la empresa" 
                />
                
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
                  label="Fecha de finalización"
                  name={`workExperience.${index}.endDate`}
                  register={register}
                  type="date"
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
            </div>
      </FieldArrayElementComponent>
    </>
  );
}

export default WorkExperienceElementComponent;
