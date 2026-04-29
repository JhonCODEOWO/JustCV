import { createContext } from "react";
import type { CreateCvFormBody } from "../../components/CreateCvForm/schemas/CreateCVSchema";
import type { CvElementContext } from "./interfaces/CvElementContext.interface";

interface CvsContextType {
    cvs: CvElementContext[],
    itemsLeft: number;
    addCv: (cv: CreateCvFormBody) => void;
    deleteCv: (index: number) => void;
    updateCv: (uuid: string, newCv: CreateCvFormBody) => void;
}

export const CvsContext = createContext<CvsContextType | null>(null);