import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent.component";
import type { Step } from "../../interfaces/StepInterface.interface";
import StepComponent from "../StepComponent/StepComponent.component";

interface StepsTimelineComponentProps {
    steps: Step[],
    actualPhase: number,
    isValidInTimeLine: (index: number) => boolean;
    isStartPointer: (index: number) => boolean;
    isEndPointer: (index: number) => boolean;
}

/**
 * Render all steps using the functions of the hook useSteps to work
 * @notes This is just a render to list all steps with styles based on the progress it does't execute logic.
 * @param props The component props
 * @returns 
 */
function StepsTimelineComponent({steps, actualPhase, isValidInTimeLine, isStartPointer, isEndPointer}: StepsTimelineComponentProps) {
    return ( 
        <>
            <HeaderComponent level={4}>
                    Progreso actual
            </HeaderComponent>
            <ul className="timeline">
                {
                    steps.map(
                        ({title, id}, index) => 
                            <StepComponent actualStep={actualPhase} index={index} isEndPointer={isEndPointer} isStartPointer={isStartPointer} isValidInTimeLine={isValidInTimeLine} title={title} key={id}/>
                    )
                }
            </ul>
        </>
     );
}

export default StepsTimelineComponent;