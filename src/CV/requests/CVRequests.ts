import axios from "axios";
import type { CreateCvFormOutput } from "../components/CreateCvForm/schemas/CreateCVSchema";
import { getDefaultImage } from "../../shared/utils/getDefaultImage";

type cvFormatTypes = 'Harvard' | 'Ats' | 'Modern';
type cvLanguages = 'en' | 'es';

interface createCvOptions {
    type: cvFormatTypes;
    language: cvLanguages;
}

export async function createCv(body: CreateCvFormOutput, userImage?: Blob, opts: Partial<createCvOptions> = {}) {
    const params = {
        type: opts.type ?? 'Harvard',
        lang: opts.language ?? 'es',
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify(body));
    formData.append('picture', userImage ?? await getDefaultImage());

    return axios.post<Blob>(
        `${import.meta.env.VITE_API_BASE_URL}/curriculum-vitae`, 
        formData, 
        {
            params: params,
            responseType: 'blob'
        });
}