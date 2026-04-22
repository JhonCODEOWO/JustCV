import { get, type ControllerRenderProps, type FieldErrors, type FieldValues } from "react-hook-form";
import type { OrientationType } from "../../../../types/OrientationType.type";
import type { LevelRateOrientationStructureClasses } from "./interfaces/LevelRateOrientationStructureClasses.interface";
import type { LevelRateInputValue } from "./interfaces/LevelRateValue.interface";

//** Record constant to store every class individual for every part of the component to apply en different orientations */
const orientationClasses: Record<OrientationType, LevelRateOrientationStructureClasses> = {
    'horizontal': {
        mainStarsContainer: 'justify-between w-full',
        starContainer: 'flex-col-reverse justify-center',
    },
    'vertical': {
        mainStarsContainer: 'flex-col gap-y-5',
        starContainer: 'flex-row-reverse justify-end gap-x-5'
    }
}

interface LevelRateComponentProps<T extends FieldValues> {
    /** The field of react hook form controller to use */
    field: ControllerRenderProps<T>,
    /** A array of data to use inside this rate component */
    rateElements: LevelRateInputValue[];
    /** The orientation to render this component */
    orientation: OrientationType;
    /** Errors from react hook form */
    errors: FieldErrors<T>,
}

function LevelRateComponent<T extends FieldValues>({rateElements, field, orientation, errors}: LevelRateComponentProps<T>) {
    const {value, onChange, name } = field;
    const error = get(errors, name);
    
    const handleSelectedElement = (value: number) => {
        onChange(value);
    }
    return (
        <div>
            <div className={`flex ${orientationClasses[orientation].mainStarsContainer}`}>
                {
                    rateElements.map((rateField, index) => (
                        <div 
                            onClick={() => handleSelectedElement(rateField.value)} 
                            key={index}
                            className={`flex ${orientationClasses[orientation].starContainer} cursor-pointer`}
                        >
                            <p className="text-center">{rateField.title}</p>
                            {
                                rateField.value <= value
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"/></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7zM8.85 8.125L4 9.725L7.1 14.2L7 18.975l5-1.375l5 1.4l-.1-4.8L20 9.775l-4.85-1.65L12 4zM12 11.5"/></svg>
                            }
                            
                        </div>
                    ))
                }
            </div>
            {error && <span className="text-xs text-error">{error.message}</span>}
        </div>
    );
}

export default LevelRateComponent;