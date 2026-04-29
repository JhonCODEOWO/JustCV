import { useEffect, useState } from "react";
import type { CreateCvFormBody } from "../../../components/CreateCvForm/schemas/CreateCVSchema";
import { CvsContext } from "../CvsContext";
import { Outlet } from "react-router-dom";
import type { CvElementContext } from "../interfaces/CvElementContext.interface";
import {v4 as uuid} from 'uuid'

function CvsProviderComponent() {
    const savesLimit = 10;
    const [cvs, setCvs] = useState<CvElementContext[]>(JSON.parse(localStorage.getItem('cvs') ?? "[]"));
    const itemsLeft = savesLimit - cvs.length;

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
    return (
        <CvsContext.Provider value={{addCv, deleteCv, cvs, itemsLeft, updateCv}}>
            <Outlet/>
        </CvsContext.Provider>
    );
}

export default CvsProviderComponent;