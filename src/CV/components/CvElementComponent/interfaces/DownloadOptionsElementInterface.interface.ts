import type { FormatDownloadTypes } from "../../../types/format-type-validation.type";
import type { LanguagesAvailable } from "../../../types/languages-availables-validation.type";

export interface DownloadOptionsElementInterface {
    language: LanguagesAvailable;
    format: FormatDownloadTypes;
}