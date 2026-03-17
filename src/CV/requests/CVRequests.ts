import axios from "axios";
import type { CreateCvFormOutput } from "../components/CreateCvForm/schemas/CreateCVSchema";

export function createCv(body: CreateCvFormOutput) {
    console.log(import.meta.env.VITE_API_BASE_URL);
    return axios.post<Blob>(`${import.meta.env.VITE_API_BASE_URL}/curriculum-vitae`, body, {responseType: 'blob'});
}