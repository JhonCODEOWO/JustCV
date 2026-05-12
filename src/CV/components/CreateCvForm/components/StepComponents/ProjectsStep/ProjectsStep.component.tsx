import type { Control, FieldArray, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import ErrorTextComponent from "../../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";
import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import InputComponent from "../../../../../../shared/components/InputComponent/input.component";
import TextAreaComponent from "../../../../../../shared/components/TextAreaComponent/TextAreaComponent.component";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import EditingContentComponent from "../../../../../../shared/components/EditingContentComponent/EditingContentComponent.component";

interface ProjectsStepProps extends StepComponentProps<CreateCvFormBody> {
    appendProject: UseFieldArrayAppend<CreateCvFormBody, "projects">
    projects: FieldArrayWithId<CreateCvFormBody, "projects", "id">[],
    removeProject: UseFieldArrayRemove,
}

function ProjectsStep({errors, register, validate, prevPhase, appendProject, projects, removeProject}: ProjectsStepProps) {
  return (
    <>
      <HeaderWithContentComponent
        level={3}
        title="Proyectos"
        content="Coloca tus proyectos personales más relevantes para tu CV"
      >
        <button
          type="button"
          className="btn btn-info"
          onClick={() =>
            appendProject({ description: "", link: "", title: "" })
          }
        >
          Añadir nuevo
        </button>
      </HeaderWithContentComponent>
      {errors.projects && (
        <ErrorTextComponent error={errors.projects.message ?? ""} />
      )}
      <section className="flex flex-col gap-y-1.5 my-1.5">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project.id} className="px-1 py-1.5 md:py-3 bg-base-200 rounded">
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
              <button type="button" className="text-error" onClick={() => removeProject(index)}>
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] px-4">
            <p className="font-bold">Aún no has agregado nada.</p>
            <p className="text-info">
              Si lo deseas puedes continuar, no es obligatorio añadir proyectos
              pero es recomendable añadir al menos 1.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsStep;
