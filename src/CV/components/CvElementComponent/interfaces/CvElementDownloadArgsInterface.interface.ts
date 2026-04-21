import type { CreateCvFormBody } from "../../CreateCvForm/schemas/CreateCVSchema";

export interface CvElementDownloadArgsInterface {
    cv: CreateCvFormBody,
    profileImage: Blob,
}