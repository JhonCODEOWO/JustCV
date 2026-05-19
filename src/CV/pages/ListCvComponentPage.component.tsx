import { useNavigate } from "react-router-dom";
import CvElementComponent from "../components/CvElementComponent/CvElementComponent";
import { useCvsContext } from "../contexts/CvsContext/hooks/CvsContextHook";
import { CreateCVSanitized } from "../components/CreateCvForm/schemas/CreateCVSchema";
import { createCv } from "../requests/CVRequests";
import { downloadBlobFile } from "../../shared/utils/downloadBlobFile";
import { useNotificationsContext } from "../../notifications/hooks/useNotificationsContext.hook";
import type { CvElementDownloadArgsInterface } from "../components/CvElementComponent/interfaces/CvElementDownloadArgsInterface.interface";
import type { DownloadOptionsElementInterface } from "../components/CvElementComponent/interfaces/DownloadOptionsElementInterface.interface";
import HeaderWithContentComponent from "../../shared/components/HeaderWithContentComponent/HeaderWithContentComponent";
import { useViewPortContext } from "../../shared/utils/contexts/ViewPortContext/ViewPortContextHook";

function ListCvComponentPage() {
    const navigation = useNavigate();
    const {cvs, deleteCv, itemsLeft} = useCvsContext();
    const {create} = useNotificationsContext();
    const {deviceType} = useViewPortContext();
    
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

    return (
        <main className="p-1.5 w-full md:p-5 md:w-[75%] relative mx-auto">
            <HeaderWithContentComponent className="mb-2" level={2} content="Administra tus CVs." title="Inicio">
                <button className="rounded btn btn-success" onClick={onAddButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                </button>
            </HeaderWithContentComponent>
            <div>Espacios disponibles para almacenar CVs: {itemsLeft}</div>
            {deviceType === 'smartphone' 
                &&
                <div role="alert" className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Parece que estás utilizando un smartphone, la experiencia para la creación/edición de tus curriculums es mejor en PC</span>
                </div>
            }
            <div className="h-87.5 overflow-y-auto rounded relative">
                {
                    cvs.length > 0
                    ?
                    cvs.map((cvElement, index) =>
                        <div key={cvElement.id} >
                            <CvElementComponent 
                            element={cvElement} 
                            index={index} 
                            onDeleteBtn={handleDeleteButton}
                            onDownloadBtn={handleDownloadButton}
                            onUpdateCv={handleUpdateFormatButton}
                            />
                        </div>
                    )
                    :
                    <section className="absolute h-full flex items-center justify-center p-2.5">
                        <p>¡Oops! Parece que aún no has creado nada, tus nuevos CVs aparecerán aquí.</p>
                    </section>
                }
            </div>
        </main>
    );
}

export default ListCvComponentPage;