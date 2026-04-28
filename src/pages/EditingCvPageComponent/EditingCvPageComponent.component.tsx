import { useParams } from "react-router-dom";
import { useCvsContext } from "../../CV/contexts/CvsContext/hooks/CvsContextHook";
import { useEffect, useState } from "react";
import type { CvElementContext } from "../../CV/contexts/CvsContext/interfaces/CvElementContext.interface";
import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";
import CreateCvForm from "../../CV/components/CreateCvForm/CreateCvForm.component";

function EditingPageComponent() {
    const {uuid} = useParams();
    const {cvs} = useCvsContext();
    const [cvFromLocalStorage, setCvFromLocalStorage] = useState<CvElementContext | null>(null);

    useEffect(() => {
        const index = cvs.findIndex((element) => element.id === uuid);
        if(index != -1) setCvFromLocalStorage(cvs[index])
    }, [uuid, cvs]);

    if(!cvFromLocalStorage) return (<>Ha ocurrido un error al encontrar el elemento guardado.</>)
    
    return ( 
        <main>
            <CreateCvForm cv={cvFromLocalStorage.cv} id={uuid}/>
        </main>
     );
}

export default EditingPageComponent;