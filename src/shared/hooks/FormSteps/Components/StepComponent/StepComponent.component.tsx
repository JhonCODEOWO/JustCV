import {isStartPointer, isValidInTimeLineRange } from "../../Helpers/StepsHelpers";

interface StepComponentProps {
    /**
     * The index of the element inside a array
     */
    index: number;
    title: string,
    /**
     * The current index in useSteps hook.
     */
    currentStepIndex: number;

    /**
     * True if the actual element is the last in the array false otherwise
     */
    isLastElement: boolean,
    onStepClick: (stepIndex: number) => void;
}

function StepComponent({title, index, currentStepIndex, isLastElement, onStepClick}:StepComponentProps) {
    
    const stepCompleted = isValidInTimeLineRange(index, currentStepIndex);
    const isActive = currentStepIndex === index;
    const notCompleted = !stepCompleted && !isActive;
    
    let indicatorClass = ``;

    if(isActive) indicatorClass = 'bg-warning';
    if(stepCompleted) indicatorClass = 'bg-success';
    if(notCompleted) indicatorClass = 'bg-neutral-content text-neutral';

    return (
        <li onClick={() => onStepClick(index)} className="cursor-pointer">
            {/* Renderize if the element is not a initial element of the array and paint the hr line if the index is valid based on the actualPhase set */}
            {!isStartPointer(index) && <hr className={index <= currentStepIndex ? 'bg-primary':'bg-base-200'}/>}
            <div className="timeline-start timeline-box">{title}</div>
                <div className="timeline-middle">
                    <div className={`h-6 w-6 flex justify-center items-center rounded-full ${indicatorClass}`}>
                        <p className="font-bold text-xs">{index + 1}</p>
                    </div>
            </div>
            
            {/* Renderize if the element is not a initial element of the array and paint the hr line if the index is valid based on the actualPhase set */}
            {!isLastElement && <hr className={stepCompleted ? 'bg-primary':'bg-base-200'}/>}
        </li>
    );
}

export default StepComponent;