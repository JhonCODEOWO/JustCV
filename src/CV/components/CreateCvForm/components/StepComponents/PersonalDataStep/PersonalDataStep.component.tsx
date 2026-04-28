import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import InputComponent from "../../../../../../shared/components/InputComponent/input.component";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type { StepComponentProps } from "../interfaces/StepComponentProps";

function PersonalDataStep({register, errors, validate}: StepComponentProps<CreateCvFormBody>) {
  return (
    <>
      <HeaderWithContentComponent
        title="Datos personales"
        content="Ingresa tus datos personales"
        level={3}
      />
      <section>
        <div className="grid grid-cols-3 gap-x-3">
          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="Nombre completo"
            name="fullname"
            register={register}
            type="text"
            validations={{
              required: "Este campo es requerido",
            }}
          />
          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="Correo electrónico"
            name="email"
            register={register}
            type="text"
            validations={{
              required: "Este campo es requerido",
              minLength: {
                message: "Debes colocar al menos 8 caracteres",
                value: 8,
              },
            }}
          />

          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="Teléfono de contacto"
            name="phoneNumber"
            register={register}
            type="text"
            validations={{
              required: "Este campo es requerido",
              minLength: {
                message: "Un número de teléfono tiene mínimo 8 caracteres",
                value: 8,
              },
              maxLength: {
                message:
                  "El número de teléfono con lada no puede ser mayor a 13 caracteres",
                value: 13,
              },
              pattern: {
                message: "Asegúrate de añadir un número de teléfono válido",
                value:
                  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
              },
            }}
          />

          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="Ciudad de residencia"
            name="residence.city"
            register={register}
            type="text"
            validations={{
              required: "Este campo es requerido",
              minLength: {
                message: "Debes colocar al menos 8 caracteres",
                value: 8,
              },
            }}
          />
          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="País de residencia"
            name="residence.country"
            register={register}
            type="text"
            validations={{
              required: "Este campo es requerido",
            }}
          />
        </div>

        <div className="flex gap-x-3 justify-between">
          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="Github"
            name="profesionalLinks.github"
            register={register}
            type="text"
          />
          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="LinkedIn"
            name="profesionalLinks.linkedIn"
            register={register}
            validations={{
              required: true,
            }}
            type="text"
          />
          <InputComponent<CreateCvFormBody>
            errors={errors}
            label="Portafolio Web"
            name="profesionalLinks.portfolioWeb"
            register={register}
            type="text"
          />
        </div>

        {/* A component text area doesn't exists it need to be created */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">
            Resume tu perfil profesional
          </legend>
          <textarea
            className={`textarea h-24 w-full outline-0 ${errors.resume ? "border border-error" : ""}`}
            placeholder="Bio"
            {...register("resume", {
              required: {
                message: "El perfil profesional es obligatorio",
                value: true,
              },
              minLength: {
                message:
                  "Un resumen de perfil profesional no puede ser demasiado corto",
                value: 200,
              },
            })}
          ></textarea>
          <p className="text-xs text-error">
            {errors.resume && errors.resume.message}
          </p>
        </fieldset>
      </section>
    </>
  );
}

export default PersonalDataStep;
