import type { CreateCvFormBody } from "../../../components/CreateCvForm/schemas/CreateCVSchema";

export interface CvElementContext {
    cv: CreateCvFormBody,
    id: string;
}