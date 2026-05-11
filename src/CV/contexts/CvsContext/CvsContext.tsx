import { createContext } from "react";
import type { CreateCvFormBody } from "../../components/CreateCvForm/schemas/CreateCVSchema";
import type { CvElementContext } from "./interfaces/CvElementContext.interface";

interface CvsContextType {
    /** All cvs inside provider */
    cvs: CvElementContext[],
    /** Items left to save based on the limit inside the provider */
    itemsLeft: number;
    /** Add a new item to the current data inside provider */
    addCv: (cv: CreateCvFormBody) => void;
    /** Delete the item based on the index inside provider */
    deleteCv: (index: number) => void;
    /** Update the item based on a existing uuid and replace it with the newCv arg data */
    updateCv: (uuid: string, newCv: CreateCvFormBody) => void;
}

export const CvsContext = createContext<CvsContextType | null>(null);