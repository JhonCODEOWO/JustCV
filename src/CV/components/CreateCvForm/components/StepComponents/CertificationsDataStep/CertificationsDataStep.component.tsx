import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import HeaderWithContentComponent from "../../../../../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import type { CreateCvFormBody } from "../../../schemas/CreateCVSchema";
import type { StepComponentProps } from "../interfaces/StepComponentProps";
import ErrorTextComponent from "../../../../../../shared/components/ErrorTextComponent/ErrorTextComponent.component";
import CertificationElementComponent from "./components/CertificationElementComponent";

interface CertificationsDataStepProps extends StepComponentProps<CreateCvFormBody> {
  certifications: FieldArrayWithId<CreateCvFormBody, "certifications", "id">[];
  appendCertification: UseFieldArrayAppend<CreateCvFormBody, "certifications">;
  removeCertification: UseFieldArrayRemove;
  control: Control<CreateCvFormBody>,
}

function CertificationsDataStep({
  errors,
  register,
  appendCertification,
  certifications,
  removeCertification,
  control,
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
                <CertificationElementComponent 
                  control={control} 
                  register={register} 
                  removeCertification={removeCertification}
                  index={index}
                  errors={errors}
                  key={certification.id}
                />
            ))
        }
      </div>
    </>
  );
}

export default CertificationsDataStep;
