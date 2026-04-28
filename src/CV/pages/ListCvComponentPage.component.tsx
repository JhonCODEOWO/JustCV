import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";
import CvElementComponent from "../components/CvElementComponent/CvElementComponent";
import { useCvsContext } from "../contexts/CvsContext/hooks/CvsContextHook";
import { CreateCVSanitized } from "../components/CreateCvForm/schemas/CreateCVSchema";
import { createCv } from "../requests/CVRequests";
import { downloadBlobFile } from "../../shared/utils/downloadBlobFile";
import { useNotificationsContext } from "../../notifications/hooks/useNotificationsContext.hook";
import type { CvElementDownloadArgsInterface } from "../components/CvElementComponent/interfaces/CvElementDownloadArgsInterface.interface";
import type { DownloadOptionsElementInterface } from "../components/CvElementComponent/interfaces/DownloadOptionsElementInterface.interface";

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

    const handleUpdateFormatButton = () => {
        
    }

    return (
        <main className="p-5 relative h-full">
            <div className="mb-3">
                <HeaderComponent level={1}>
                    Inicio
                </HeaderComponent>
                <p>Administra tus CVs creados o genera PDFs.</p>
            </div>

            {
                cvs.map((cvElement, index) => 
                    <CvElementComponent 
                        cv={cvElement.cv} 
                        key={cvElement.id} 
                        index={index} 
                        onDeleteBtn={handleDeleteButton}
                        onDownloadBtn={handleDownloadButton}
                        onUpdateCv={handleUpdateFormatButton}
                    />
                )
            }

            <button className="rounded btn btn-success absolute bottom-0 right-5" onClick={onAddButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
            </button>
        </main>
    );
}

export default ListCvComponentPage;