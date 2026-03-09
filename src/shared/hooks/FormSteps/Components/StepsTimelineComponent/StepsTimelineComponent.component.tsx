import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent.component";
import { useSteps } from "../../FormSteps";
import type { Step } from "../../interfaces/StepInterface.interface";

interface StepsTimelineComponentProps {
    steps: Step[],
}

function StepsTimelineComponent({steps}: StepsTimelineComponentProps) {
    const {actualPhase, isEndPointer, isStartPointer, isValidInTimeLine, nextPhase, prevPhase, totalPhases} = useSteps(steps);
    return ( 
        <>
            <HeaderComponent level={4} >
                    Progreso actual
                </HeaderComponent>
                <button className="btn btn-info" onClick={nextPhase}>Avanzar paso</button>
                <button className="btn btn-info" onClick={prevPhase}>Retroceder paso</button>
                <ul className="timeline">
                    {totalPhases
                    .map(
                        ({title, id}, index) => 
                            <li key={id}>
                                {/* Renderize if the element is not a initial element of the array and paint the hr line if the index is valid based on the actualPhase set */}
                                {!isStartPointer(index) && <hr className={isValidInTimeLine(index)? 'bg-primary':'bg-base-200'}/>}
                                <div className="timeline-start timeline-box">{title}</div>
                                <div className="timeline-middle">
                                    <div className={`h-4 w-4 rounded ${(isValidInTimeLine(index) && index != actualPhase? 'bg-success': 'bg-warning')}`}></div>
                                </div>
                                {/* Renderize if the element is not a initial element of the array and paint the hr line if the index is valid based on the actualPhase set */}
                                {!isEndPointer(index) && <hr className={isValidInTimeLine(index + 1)? 'bg-primary':'bg-base-200'}/>}
                            </li>
                        )
                    }
                </ul>
        </>
     );
}

export default StepsTimelineComponent;