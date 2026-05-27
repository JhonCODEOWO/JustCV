import FieldArrayElementComponent from "../../../../../../../shared/components/FieldArrayElementComponent/FieldArrayElementComponent";
import InputComponent from "../../../../../../../shared/components/InputComponent/input.component";
import { Certification, type CreateCvFormBody } from "../../../../schemas/CreateCVSchema";
import { type FieldErrors, type UseFormRegister, type Control, type Path, useWatch } from "react-hook-form";

interface CertificationElementComponentProps {
    errors: FieldErrors<CreateCvFormBody>,
    register: UseFormRegister<CreateCvFormBody>,
    index: number;
    removeCertification: (index: number) => void;
    control: Control<CreateCvFormBody>
}

function CertificationElementComponent({index, control, errors, register, removeCertification}: CertificationElementComponentProps) {
    const name: Path<CreateCvFormBody> = `certifications.${index}` as const;
    const values = useWatch({control, name});
    const title = [values?.institution, values?.name].filter(val => val && val?.trim().length > 0).join(', ') || 'Nombre de la certificación, Institución';

    return ( 
        <FieldArrayElementComponent
                  index={index}
                  onDelete={removeCertification}
                  isValid={Certification.safeParse(values).success}
                  title={title}
                >
                  <div className="grid grid-cols-2 gap-x-3 bg-base-300 rounded my-2 p-5 relative">
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
                </div>
                </FieldArrayElementComponent>
     );
}

export default CertificationElementComponent;