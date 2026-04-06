import { createContext } from "react";
import type { CreateCvFormBody } from "../../components/CreateCvForm/schemas/CreateCVSchema";

interface CvsContextType {
    cvs: CreateCvFormBody[],
    addCv: (cv: CreateCvFormBody) => void;
    deleteCv: (index: number) => void;
}

export const CvsContext = createContext<CvsContextType | null>(null);