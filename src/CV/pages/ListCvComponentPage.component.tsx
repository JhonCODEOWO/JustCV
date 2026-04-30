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

function ListCvComponentPage() {
    const navigation = useNavigate();
    const {cvs, deleteCv} = useCvsContext();
    const {create} = useNotificationsContext();
    
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
        <main className="p-5 w-[75%] relative mx-auto">
            <HeaderWithContentComponent className="mb-2" level={2} content="Administra tus CVs." title="Inicio">
                <button className="rounded btn btn-success" onClick={onAddButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                </button>
            </HeaderWithContentComponent>

            <div className="h-87.5 overflow-y-auto rounded p-2">
                {
                    cvs.map((cvElement, index) =>
                        <div key={cvElement.id} >
                            <CvElementComponent 
                            element={cvElement} 
                            index={index} 
                            onDeleteBtn={handleDeleteButton}
                            onDownloadBtn={handleDownloadButton}
                            onUpdateCv={handleUpdateFormatButton}
                            />
                            <div className="divider"></div>
                        </div>
                    )
                }
            </div>
        </main>
    );
}

export default ListCvComponentPage;