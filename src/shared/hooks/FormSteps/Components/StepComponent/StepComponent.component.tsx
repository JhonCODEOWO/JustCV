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
    
    let stateStep = ``;

    if(isActive) stateStep = 'step-warning';
    if(stepCompleted) stateStep = 'step-success';
    if(notCompleted) stateStep = 'step-base-200';

    return (
        <li onClick={() => onStepClick(index)}  className={`step ${stateStep} cursor-pointer hover:bg-base-200`}>
            {title}
        </li>
    );
}

export default StepComponent;