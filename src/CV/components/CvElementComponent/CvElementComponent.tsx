import { cutString } from "../../../shared/utils/stringHelpers";
import type { CreateCvFormBody } from "../CreateCvForm/schemas/CreateCVSchema";

interface CvElementComponentProps {
    cv: CreateCvFormBody;
    index: number;
    onDeleteBtn: (index: number) => void;
}

function CvElementComponent({ cv, index, onDeleteBtn }: CvElementComponentProps) {
    return (
        <div className="grid grid-cols-4">
            <div className="flex flex-col">
                <p>{cv.fullname}</p>
                <p>{cv.email}</p>
            </div>
            <p>{cutString(cv.resume, {endIndex: 50})}</p>
            
            <div>
                <button className="btn btn-error" onClick={() => onDeleteBtn(index)}></button>
                <button className="btn btn-info"></button>
            </div>
        </div>
    );
}

export default CvElementComponent;