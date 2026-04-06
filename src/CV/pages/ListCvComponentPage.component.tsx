import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";
import CvElementComponent from "../components/CvElementComponent/CvElementComponent";
import { useCvsContext } from "../contexts/CvsContext/hooks/CvsContextHook";

function ListCvComponentPage() {
    const navigation = useNavigate();
    const {cvs, deleteCv} = useCvsContext();
    
    const onAddButton = () => {
        navigation('/creating-cv');
    }

    const handleDeleteButton = (index: number) => {
        deleteCv(index);
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
                cvs.map((cv, index) => 
                    <CvElementComponent cv={cv} key={index} index={index} onDeleteBtn={handleDeleteButton}/>
                )
            }

            <button className="rounded btn btn-success absolute bottom-0 right-5" onClick={onAddButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
            </button>
        </main>
    );
}

export default ListCvComponentPage;