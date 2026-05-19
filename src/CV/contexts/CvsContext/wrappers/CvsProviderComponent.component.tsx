import { useEffect, useState } from "react";
import type { CreateCvFormBody } from "../../../components/CreateCvForm/schemas/CreateCVSchema";
import { CvsContext } from "../CvsContext";
import { Outlet } from "react-router-dom";
import type { CvElementContext } from "../interfaces/CvElementContext.interface";
import {v4 as uuid} from 'uuid'
import { downloadBlobFile } from "../../../../shared/utils/downloadBlobFile";
import { BackupSchema } from "../schemas/BackupSchema";
import { useNotificationsContext } from "../../../../notifications/hooks/useNotificationsContext.hook";

function CvsProviderComponent() {
    const savesLimit = 10;
    const [cvs, setCvs] = useState<CvElementContext[]>(JSON.parse(localStorage.getItem('cvs') ?? "[]"));
    const itemsLeft = savesLimit - cvs.length;
    const {create} = useNotificationsContext();

    useEffect(() => {
        localStorage.setItem('cvs', JSON.stringify(cvs));
    }, [cvs]);

    const deleteCv = (index: number): void => {
        setCvs(prev => {
            const filtered = prev.filter((_, i) => i != index);
            return filtered;
        });
    }

    const addCv = (cvForm: CreateCvFormBody) => {
        const uniqueID = uuid();
        setCvs(prev => [...prev, {cv: cvForm, id: uniqueID}]);
    }

    const updateCv = (uuid: string, newCv: CreateCvFormBody) => {
        setCvs(prev => {
            return prev.map(cvElement => {
                if(cvElement.id === uuid) return ({...cvElement, cv: newCv})
                return {...cvElement};
            })
        });
    }

    /**
     * Make backup of the current Cvs
     */
    const backup = (name: string) => {
        if(!cvs || cvs.length === 0) return;
        const plainData = JSON.stringify(cvs);
        const blobFile = new Blob([plainData], {type: 'application/json'});
        downloadBlobFile(blobFile, name);
    }

    /**
     * Restore the data from a file without replace all current data.
     * @param restoreFile The external file to restore or update current data.
     */
    const restore = async (restoreFile: File) => {
        try {
            const content = await restoreFile.text();
            const parsed = JSON.parse(content);

            const backupSanitized = BackupSchema.parse(parsed);
            
            setCvs((prev) => {
                const prevMap = new Map<string, CreateCvFormBody>(
                    prev.map(el => [el.id, el.cv])
                );

                backupSanitized.forEach(el => {
                    prevMap.set(el.id, el.cv)
                })
                
                const mergedData = Array.from(prevMap.entries()).map(([id, cv]) => ({cv, id}));

                const excludedElements = Math.max(mergedData.length - savesLimit, 0);

                if(excludedElements > 0) create({content: `Al intentar restaurar se han superado los elementos disponibles a guardar, se excluyeron ${excludedElements} elementos.`, type: 'warning'})
    
                return mergedData.slice(0, savesLimit);
            })
            create({content: 'Se han restaurado los datos de tu archivo de guardado correctamente.'});
        } catch (error) {
            create({content: 'No se ha podido restaurar el contenido del archivo.', type: 'error'})
        }
    }

    return (
        <CvsContext.Provider value={{addCv, deleteCv, cvs, itemsLeft, updateCv, backup, restore}}>
            <Outlet/>
        </CvsContext.Provider>
    );
}

export default CvsProviderComponent;