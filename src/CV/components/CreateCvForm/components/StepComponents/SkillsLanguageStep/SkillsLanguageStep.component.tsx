import ErrorTextComponent from "../../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";
import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import InputComponent from "../../../../../../shared/components/InputComponent/input.component";
import LevelRateInputComponent from "../../../../../../shared/components/LevelRateComponent/LevelRateInputComponent.component";
import SelectComponent from "../../../../../../shared/components/SelectComponent/SelectComponent";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import type { Control, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";

interface SkillsLanguageProps extends StepComponentProps<CreateCvFormBody> {
  skills: FieldArrayWithId<CreateCvFormBody, "skills", "id">[];
  languages: FieldArrayWithId<CreateCvFormBody, "languages", "id">[];
  appendSkill: UseFieldArrayAppend<CreateCvFormBody, "skills">;
  appendLanguage: UseFieldArrayAppend<CreateCvFormBody, "languages">;
  control: Control<CreateCvFormBody>,
  removeSkill: UseFieldArrayRemove,
  removeLanguage: UseFieldArrayRemove
}

function SkillsLanguageStep({
  errors,
  register,
  validate,
  prevPhase,
  skills,
  languages,
  appendLanguage,
  appendSkill,
  control,
  removeLanguage, 
  removeSkill
}: SkillsLanguageProps) {
  const rateElements = [
    {
      title: "1",
      value: 1,
    },
    {
      title: "2",
      value: 2,
    },
    {
      title: "3",
      value: 3,
    },
    {
      title: "4",
      value: 4,
    },
    {
      title: "5",
      value: 5,
    },
  ];
  return (
    <>
      <HeaderWithContentComponent
        level={3}
        title="Idiomas & Habilidades"
        content="Especifica habilidades e idiomas con tu nivel."
      />
      <section className="grid grid-cols-2 gap-x-4 mt-4">
        <div>
          <HeaderWithContentComponent
            level={4}
            title="Habilidades"
            content="Redacta cada habilidad y el rango de dominio sobre ellas."
          >
            <button
              type="button"
              className="btn btn-info"
              onClick={() => appendSkill({ level: 1, name: "" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                />
              </svg>
            </button>
          </HeaderWithContentComponent>
          {errors.skills && (
            <ErrorTextComponent error={errors.skills.message ?? ""} />
          )}

          {skills.map((skill, index) => (
            <div key={skill.id} className="relative">
              <InputComponent<CreateCvFormBody>
                register={register}
                errors={errors}
                label="Habilidad"
                name={`skills.${index}.name`}
                type="text"
                validations={{ required: true }}
              />
              <LevelRateInputComponent<CreateCvFormBody>
                errors={errors}
                control={control}
                name={`skills.${index}.level`}
                rateElements={rateElements}
                label="Nivel de habilidad"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="cursor-pointer absolute right-0 top-0 text-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div>
          <HeaderWithContentComponent
            level={4}
            title="Idioma"
            content="Añade los idiomas que dominas y nivel de cada uno."
          >
            <button
              type="button"
              className="btn btn-info"
              onClick={() => appendLanguage({ level: "Nativo", name: "" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                />
              </svg>
            </button>
          </HeaderWithContentComponent>
          {errors.languages && (
            <ErrorTextComponent error={errors.languages.message ?? ""} />
          )}

          {languages.map((language, index) => (
            <div key={language.id} className="relative">
              <InputComponent<CreateCvFormBody>
                errors={errors}
                label="Nombre del idioma"
                name={`languages.${index}.name`}
                register={register}
                type="text"
                validations={{ required: true }}
              />
              <SelectComponent<CreateCvFormBody>
                errors={errors}
                label="Selecciona el nivel del idioma"
                name={`languages.${index}.level`}
                register={register}
                selectOptions={[
                  { label: "Nativo", value: "Nativo" },
                  { label: "A1", value: "A1" },
                  { label: "A2", value: "A1" },
                  { label: "B1", value: "B1" },
                  { label: "B2", value: "B2" },
                  { label: "C1", value: "C1" },
                  { label: "C2", value: "C2" },
                ]}
                isOptional={false}
              />
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="cursor-pointer absolute right-0 top-0 text-error"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SkillsLanguageStep;
