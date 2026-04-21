import { useForm } from "react-hook-form";
import SelectComponent, { type SelectOpt } from "../../../shared/components/SelectComponent/SelectComponent";
import { cutString } from "../../../shared/utils/stringHelpers";
import { type CreateCvFormBody } from "../CreateCvForm/schemas/CreateCVSchema";
import { useState } from "react";
import ModalComponent from "../../../shared/components/ModalComponent/ModalComponent.component";
import InputFileImageComponent from "../../../shared/components/InputFileImageComponent/InputFileImageComponent.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadOptions, type FormData } from "./schemas/download-options.schema";
import type { DownloadOptionsElementInterface } from "./interfaces/DownloadOptionsElementInterface.interface";
import type { CvElementDownloadArgsInterface } from "./interfaces/CvElementDownloadArgsInterface.interface";


interface CvElementComponentProps {
    cv: CreateCvFormBody;
    index: number;
    onDeleteBtn: (index: number) => void;
    onDownloadBtn: (args: CvElementDownloadArgsInterface, options: DownloadOptionsElementInterface) => Promise<boolean>;
    onUpdateCv: () => void;
}

const formatValues: SelectOpt[] = [
    {
        label: 'Harvard',
        value: 'Harvard',
    },
    {
        label: 'Ats',
        value: 'Ats',
    },
    {
        label: 'Moderno',
        value: 'Modern',
    }
]

const languageOptions: SelectOpt[] = [
    {
        label: 'Inglés',
        value: 'en',
    },
    {
        label: 'Español',
        value: 'es'
    }
]

function CvElementComponent({ cv, index, onDeleteBtn, onDownloadBtn, onUpdateCv }: CvElementComponentProps) {
    const [downloading ,setDownloading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {register, formState: {errors},reset, setError, watch, getValues, trigger} = useForm({
        mode: 'onChange',
        defaultValues: {
            formatType: 'Ats',
            language: 'es',
        },
        resolver: zodResolver(DownloadOptions),
    });

    const formatTypeSelected = watch('formatType');
    const languageSelected = watch('language');

    const handleCloseModal = () => {
        setShowModal(false);
    }
    
    const handleAccept = async () => {
        if(downloading) return;

        const validated = await trigger();
        if(!validated) return;
        setDownloading(true);

        const result = await onDownloadBtn({cv, profileImage: getValues('profileImage')[0]}, {format: formatTypeSelected, language: languageSelected});
        setDownloading(false);
        if(result) reset();
        setShowModal(false);
    }

    return (
        <div className="grid grid-cols-4 rounded-lg p-4 border border-base-200 bg-base-300">
                <ModalComponent 
                    title="Personaliza tu descarga" 
                    onCloseModal={handleCloseModal}
                    onAccept={handleAccept}
                    show={showModal}
                    closeLabel="Cancelar"
                    titleExtraInfo="Selecciona el formato y el lenguaje para la generación del archivo."
                >
                    {
                        !downloading &&
                        <div className="flex gap-x-4">
                            <InputFileImageComponent<FormData>
                                setError={setError}
                                maxSize={2}
                                multipleFiles={false}
                                errors={errors}
                                name="profileImage"
                                register={register}
                                watch={watch}
                                label="Selecciona la imagen a utilizar"
                            />
                            <div className="flex-1">
                                <SelectComponent<FormData> errors={errors} name="formatType" label="Formato de descarga" register={register} isOptional={false} selectOptions={formatValues}/>
                                <SelectComponent<FormData> errors={errors} name="language" label="Idioma" register={register} isOptional={false} selectOptions={languageOptions}/>
                            </div>
                        </div>
                    }
                    {
                        downloading &&
                        <div className="w-full flex justify-center items-center h-full flex-col">
                            <span className="loading loading-spinner loading-xl"></span>
                            <p>Generando, espera por favor...</p>
                        </div>
                    }
                </ModalComponent>
            <div className="flex flex-col">
                <p>{cv.fullname}</p>
                <p>{cv.email}</p>
            </div>
            <p>{cutString(cv.resume, {endIndex: 50})}</p>
            <div>
                <button className="btn btn-error" onClick={() => onDeleteBtn(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3.713-4.288Q11 16.426 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288"/></svg>
                </button>
                <button className="btn btn-info" onClick={onUpdateCv}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 15v-4.25L19.625.125L23.8 4.4L13.25 15zm10.6-9.2l1.425-1.4l-1.4-1.4L18.2 4.4zM3 21V3h10.925L7 9.925V17h7.05L21 10.05V21z"/></svg>
                </button>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Descargar CV
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17l4-4l-1.4-1.4l-1.6 1.55V9h-2v4.15L9.4 11.6L8 13zm-8 5V8l6-6h10v20z"/></svg>
                </button>
            </div>
        </div>
    );
}

export default CvElementComponent;