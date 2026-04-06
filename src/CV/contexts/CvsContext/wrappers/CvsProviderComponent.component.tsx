import { useEffect, useState } from "react";
import type { CreateCvFormBody } from "../../../components/CreateCvForm/schemas/CreateCVSchema";
import { CvsContext } from "../CvsContext";
import { Outlet } from "react-router-dom";

function CvsProviderComponent() {
    const savesLimit = 10;
    const [cvs, setCvs] = useState<CreateCvFormBody[]>(JSON.parse(localStorage.getItem('cvs') ?? "[]"));

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
        setCvs(prev => [...prev, cvForm]);
    }
    return (
        <CvsContext.Provider value={{addCv, deleteCv, cvs}}>
            <Outlet/>
        </CvsContext.Provider>
    );
}

export default CvsProviderComponent;