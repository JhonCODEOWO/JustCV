import type { Control, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import ErrorTextComponent from "../../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";
import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import ProjectElementComponent from "../../ProjectElement/ProjectElementComponent";

interface ProjectsStepProps extends StepComponentProps<CreateCvFormBody> {
    appendProject: UseFieldArrayAppend<CreateCvFormBody, "projects">
    projects: FieldArrayWithId<CreateCvFormBody, "projects", "id">[],
    removeProject: UseFieldArrayRemove,
    control: Control<CreateCvFormBody>
}

function ProjectsStep({errors, register, appendProject, projects, removeProject, control}: ProjectsStepProps) {
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
            <ProjectElementComponent 
              control={control} 
              errors={errors} 
              register={register} 
              index={index} 
              removeProject={() => removeProject(index)}
              key={project.id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-100 px-4">
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
