import { useNavigate } from "react-router-dom";
import CvElementComponent from "../components/CvElementComponent/CvElementComponent";
import { useCvsContext } from "../contexts/CvsContext/hooks/CvsContextHook";
import { CreateCVSanitized, fileList } from "../components/CreateCvForm/schemas/CreateCVSchema";
import { createCv } from "../requests/CVRequests";
import { downloadBlobFile } from "../../shared/utils/downloadBlobFile";
import { useNotificationsContext } from "../../notifications/hooks/useNotificationsContext.hook";
import type { CvElementDownloadArgsInterface } from "../components/CvElementComponent/interfaces/CvElementDownloadArgsInterface.interface";
import type { DownloadOptionsElementInterface } from "../components/CvElementComponent/interfaces/DownloadOptionsElementInterface.interface";
import HeaderWithContentComponent from "../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { useViewPortContext } from "../../shared/utils/contexts/ViewPortContext/ViewPortContextHook";
import ModalComponent from "../../shared/components/ModalComponent/ModalComponent.component";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../../shared/components/InputComponent/input.component";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFileImageComponent from "../../shared/components/InputFileImageComponent/InputFileImageComponent.component";

const RestoreForm = z.object({
    file: 
        fileList
        .refine((fileList) => (fileList.length > 0), {error: 'Debes seleccionar el archivo'})
        .refine((fileList) => (fileList.length === 1), {error: 'Solo se admite un archivo'})
        .superRefine((fileList, ctx) => {
            const backupFile = fileList[0];

            if(backupFile.type != 'application/json') ctx.addIssue({code: 'custom', message: 'Solo se permiten archivos .json'})
        })
})

const BackupForm = z.object({
    name: z.string().min(1, 'Debes colocar un nombre que te permite identificar tu backup.')
})

type BackupFormBody = z.input<typeof BackupForm>;
type RestoreFormBody = z.input<typeof RestoreForm>;

function ListCvComponentPage() {
    const navigation = useNavigate();
    const {cvs, deleteCv, itemsLeft, backup, restore} = useCvsContext();
    const {create} = useNotificationsContext();
    const {deviceType} = useViewPortContext();
    const [showBackupModal, setShowBackupModal] = useState(false);
    const [showRestoreModal, setShowRestoreModal] = useState(false);
    const {register, formState: {errors}, trigger, getValues, reset} = useForm<BackupFormBody>({
        values: {name: ''}, 
        resolver: zodResolver(BackupForm),
        mode: 'onChange'
    });
    const {
        register: restoreFormRegister, 
        watch: restoreFormWatch,
        formState: {errors: restoreFormErrors}, 
        trigger: restoreFormTrigger, 
        getValues: restoreFormGetValues,
        reset: restoreFormReset
    } = useForm<RestoreFormBody>({
                mode: 'onChange',
                resolver: zodResolver(RestoreForm)
        })
    
    const onAddButton = () => {
        navigation('/creating-cv');
    }

    const handleDeleteButton = (index: number) => {
        deleteCv(index);
        create({content: 'Se ha eliminado el cv correctamente', type: 'success'});
    }

    const handleDownloadButton = async ({cv, profileImage}: CvElementDownloadArgsInterface, {format, language}: DownloadOptionsElementInterface): Promise<boolean> => {
        const output = CreateCVSanitized.parse(cv);
        try {
            const {data} = await createCv(output, profileImage, {type: format, language});
            downloadBlobFile(data, cv.fullname);
            return true;
        } catch (error) {
            create({type: 'error', content: `Ha ocurrido un error al generar y descargar el pdf. ${error}`})
            return false;
        }
    }

    const handleUpdateFormatButton = (uuid: string) => {
        navigation(`/editing/${uuid}`);
    }

    const handleOnAcceptModalBackup = async () => {
        const valid = await trigger();
        if(!valid) return;
        backup(getValues('name'));
        reset();
        setShowBackupModal(false);
    }

    const handleOnCloseModalBackup = () => {
        reset();
        setShowBackupModal(false);
    }

    const handleOnAcceptModalRestore = async () => {
        const restoreFormValid = await restoreFormTrigger()

        if(!restoreFormValid) return;
        const file = restoreFormGetValues('file')[0];
        await restore(file);
        setShowRestoreModal(false);
    }

    const handleOnCloseModalRestore = () => {
        setShowRestoreModal(false);
    }

    return (
        <main className="p-1.5 w-full md:p-5 md:w-[95%] lg:w-[75%] relative mx-auto">
            <ModalComponent
                onAccept={handleOnAcceptModalBackup}
                show={showBackupModal}
                title="Crear backup..."
                titleExtraInfo="Recuerda que al crear un backup la información permanecerá estática en el archivo, deberás crear un nuevo backup por cada actualización realizada posterior al crearla."
                onCloseModal={handleOnCloseModalBackup}
            >
                <form>
                    <InputComponent<BackupFormBody>
                        errors={errors}
                        register={register}
                        validations={{required: true}}
                        label="Nombre del archivo"
                        name="name"
                        type="text"
                    />
                </form>
            </ModalComponent>
            <ModalComponent
                onAccept={handleOnAcceptModalRestore}
                onCloseModal={handleOnCloseModalRestore}
                show={showRestoreModal}
                title="Recuperar información..."
                titleExtraInfo="Selecciona el archivo backup .json y nosotros nos encargaremos de restaurar esa información."
            >
                <form>
                    <InputFileImageComponent watch={restoreFormWatch} errors={restoreFormErrors} maxSize={1} name="file" register={restoreFormRegister} multipleFiles={false}  label="Archivo de backup .json"/>
                </form>
            </ModalComponent>
            <HeaderWithContentComponent className="mb-2" level={2} content="Administra tus CVs." title="Inicio">
                <div className="flex gap-x-2">
                    {
                        cvs.length > 0 &&
                        <button 
                            className="btn btn-info tooltip tooltip-left" 
                            data-tip="Exportar CVs a archivo JSON."
                            onClick={() => setShowBackupModal(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="currentColor" d="m5.05 22.375l-1.4-1.425L6.6 18H4.35v-2H10v5.65H8v-2.225zM12 22v-8H4V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm1-13h5l-5-5l5 5l-5-5z" />
                            </svg>
                        </button>
                    }
                    
                    <button 
                        className="btn btn-warning tooltip tooltip-left" 
                        data-tip="Restaurar a partir de un backup"
                        onClick={() => setShowRestoreModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M12 14q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0 7q-3.475 0-6.025-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21" />
                        </svg>
                    </button>
                </div>
            </HeaderWithContentComponent>
            {deviceType === 'smartphone' 
                &&
                <div role="alert" className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-xs">Parece que estás utilizando un smartphone, la experiencia para la creación/edición de tus curriculums es mejor en PC</span>
                </div>
            }
            <div className="relative w-full mt-2">
                {
                    cvs.length > 0
                    ?
                    <div className="rounded-lg bg-base-200 overflow-hidden">
                        <div className="text-center w-full py-3 bg-base-300">
                            <p className="font-bold">Cvs creados</p>
                        </div>
                        <div className="h-[calc(100dvh-340px)] overflow-y-auto px-1.5 flex flex-col gap-y-2">
                            {cvs.map((cvElement, index) =>
                                <div key={cvElement.id} className="first:mt-2">
                                    <CvElementComponent 
                                    element={cvElement} 
                                    index={index} 
                                    onDeleteBtn={handleDeleteButton}
                                    onDownloadBtn={handleDownloadButton}
                                    onUpdateCv={handleUpdateFormatButton}
                                    />
                                </div>
                            )}
                            <button className="btn btn-soft btn-success w-full mt-1.5" onClick={onAddButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                                Añadir nuevo
                            </button>
                        </div>
                        <p className="text-sm p-1.5 bg-base-300">Espacios restantes: {itemsLeft}</p>
                    </div>
                    :
                    <section className="min-h-87.5 flex flex-col gap-y-3 items-center justify-center bg-base-200">
                        <p className="text-center font-semibold">¡Oops! Parece que aún no has creado nada, tus nuevos CVs aparecerán aquí.</p>
                        <div className="flex flex-col gap-y-1.5 justify-between text-sm">
                            <button className="btn" onClick={() => setShowRestoreModal(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="M12 14q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0 7q-3.475 0-6.025-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21" />
                                </svg>
                                Restaurar desde un archivo...
                            </button>
                            <button className="btn" onClick={onAddButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                                    Añadir nuevo
                            </button>
                        </div>
                    </section>
                }
            </div>
        </main>
    );
}

export default ListCvComponentPage;