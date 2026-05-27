import { useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import InputComponent from "../../../../../shared/components/InputComponent/input.component";
import { Project, type CreateCvFormBody } from "../../schemas/CreateCVSchema";
import TextAreaComponent from "../../../../../shared/components/TextAreaComponent/TextAreaComponent.component";
import FieldArrayElementComponent from "../../../../../shared/components/FieldArrayElementComponent/FieldArrayElementComponent";

interface ProjectElementComponentProps {
    errors: FieldErrors<CreateCvFormBody>,
    register: UseFormRegister<CreateCvFormBody>,
    index: number;
    removeProject: (index: number) => void;
    control: Control<CreateCvFormBody>
}

function ProjectElementComponent({register, errors, index, removeProject, control}: ProjectElementComponentProps) {
    const value = useWatch({control: control, name: `projects.${index}`});
    const headerTitle = [value?.title, value?.description].filter(val => val && val?.trim().length > 0).join(', ') || 'Nombre del proyecto, Descripción';
    
    return (

        <FieldArrayElementComponent
            onDelete={removeProject}
            title={headerTitle}
            isValid={Project.safeParse(value).success}
            index={index}
        >
            <div className="px-1 py-1.5 md:py-3 bg-base-200 rounded">
              <div className="grid grid-cols-2 gap-x-3">
                <InputComponent<CreateCvFormBody>
                  errors={errors}
                  label="Nombre del proyecto"
                  name={`projects.${index}.title`}
                  register={register}
                  type="text"
                  validations={{ required: true }}
                />
                <InputComponent<CreateCvFormBody>
                  errors={errors}
                  label="Link"
                  name={`projects.${index}.link`}
                  register={register}
                  type="text"
                  validations={{}}
                />
              </div>
              <TextAreaComponent
                errors={errors}
                label="Descripción del proyecto"
                name={`projects.${index}.description`}
                register={register}
                required={true}
                placeholder="El proyecto fué realizado con..."
              />
            </div>
        </FieldArrayElementComponent>
     );
}

export default ProjectElementComponent;