import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent.component";
import { isEndPointer } from "../../Helpers/StepsHelpers";
import type { Step } from "../../interfaces/StepInterface.interface";
import StepComponent from "../StepComponent/StepComponent.component";

interface StepsTimelineComponentProps {
    title?: string;
    steps: Step[],
    actualPhase: number,
    onStepWanted: (index: number, step: Step) => void;
    style?: 'timeline-vertical' | 'timeline-horizontal';
}

/**
 * Render all steps using the functions of the hook useSteps to work
 * @notes This is just a render to list all steps with styles based on the progress it does't execute logic.
 * @param props The component props
 * @returns 
 */
function StepsTimelineComponent({steps, actualPhase, title = 'Progreso Actual', onStepWanted, style = 'timeline-vertical'}: StepsTimelineComponentProps) {
    
    return ( 
        <>
            <HeaderComponent level={4}className="text-center">
                    {title}
            </HeaderComponent>
            <ul className={`timeline ${style}`}>
                {
                    steps.map(
                        ({title, id}, index) => 
                            <StepComponent 
                                currentStepIndex={actualPhase} 
                                index={index} 
                                title={title} 
                                key={id}
                                isLastElement={isEndPointer(index, steps.length)}
                                onStepClick={(index) => onStepWanted(index, steps[index])}
                            />
                    )
                }
            </ul>
        </>
     );
}

export default StepsTimelineComponent;