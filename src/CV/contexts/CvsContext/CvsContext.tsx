import { createContext } from "react";
import type { CreateCvFormBody } from "../../components/CreateCvForm/schemas/CreateCVSchema";

interface CvsContextType {
    cvs: CreateCvFormBody[],
    itemsLeft: number;
    addCv: (cv: CreateCvFormBody) => void;
    deleteCv: (index: number) => void;
}

export const CvsContext = createContext<CvsContextType | null>(null);