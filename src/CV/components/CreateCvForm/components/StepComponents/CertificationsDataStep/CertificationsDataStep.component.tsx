import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import InputComponent from "../../../../../../shared/components/InputComponent/input.component";
import ErrorTextComponent from "../../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";

interface CertificationsDataStepProps extends StepComponentProps<CreateCvFormBody> {
  certifications: FieldArrayWithId<CreateCvFormBody, "certifications", "id">[];
  appendCertification: UseFieldArrayAppend<CreateCvFormBody, "certifications">;
  removeCertification: UseFieldArrayRemove;
}

function CertificationsDataStep({
  errors,
  register,
  validate,
  prevPhase,
  appendCertification,
  certifications,
  removeCertification,
}: CertificationsDataStepProps) {
  return (
    <>
      <HeaderWithContentComponent
        level={3}
        content="Añade las certificaciones que refuercen el cv."
        title="Certificaciones"
      >
        <button className="btn btn-success" type="button" onClick={() => appendCertification({name: '', institution: '', year: ''})}>
          Añadir
        </button>
      </HeaderWithContentComponent>
      {errors.certifications && <ErrorTextComponent error={errors.certifications.message ?? ''}/>}
      <div>
        {
            certifications.length === 0
            ?
            <p className="text-center text-info">Ninguna certificación ha sido añadida.</p>
            :
            certifications.map((certification, index) => (
                <div key={certification.id} className="grid grid-cols-2 gap-x-3 bg-base-300 rounded my-2 p-5 relative">
                        <InputComponent<CreateCvFormBody> 
                        errors={errors} 
                        register={register} 
                        label="Nombre del certificado" 
                        name={`certifications.${index}.name`}
                        type="text"
                        validations={{required: true}}
                        />
                        <InputComponent<CreateCvFormBody>
                            errors={errors} 
                            register={register} 
                            label="Institución que otorga el certificado" 
                            name={`certifications.${index}.institution`}
                            type="text"
                            validations={{required: true}}
                        />
                    <div className="col-span-2">
                        <InputComponent<CreateCvFormBody>
                            errors={errors} 
                            register={register} 
                            label="Fecha de obtención (No coloques fecha si lo cursas actualmente)" 
                            name={`certifications.${index}.year`}
                            type="date"
                        />
                    </div>
                    <div className="col-span-2 flex flex-row-reverse">
                            <button type="button" onClick={() => removeCertification(index)} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 18v-2h4v2zm0-8V8h7v2zm0 4v-2h6v2zM3 8H2V6h4V4.5h4V6h4v2h-1v9q0 .825-.587 1.413T11 19H5q-.825 0-1.412-.587T3 17z"/></svg>
                            </button>
                    </div>
                </div>
            ))
        }
      </div>
    </>
  );
}

export default CertificationsDataStep;
