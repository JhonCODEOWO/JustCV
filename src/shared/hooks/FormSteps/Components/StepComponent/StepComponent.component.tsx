interface StepComponentProps {
    index: number;
    title: string,
    actualStep: number;
    isValidInTimeLine: (index: number) => boolean;
    isStartPointer: (index: number) => boolean;
    isEndPointer: (index: number) => boolean;
}

function StepComponent({title, isEndPointer, isStartPointer, isValidInTimeLine, index, actualStep}:StepComponentProps) {
    return (
        <li>
            {/* Renderize if the element is not a initial element of the array and paint the hr line if the index is valid based on the actualPhase set */}
            {!isStartPointer(index) && <hr className={isValidInTimeLine(index)? 'bg-primary':'bg-base-200'}/>}
            <div className="timeline-start timeline-box">{title}</div>
                <div className="timeline-middle">
                    <div className={`h-4 w-4 rounded ${(isValidInTimeLine(index) && index != actualStep? 'bg-success': 'bg-warning')}`}></div>
            </div>
            
            {/* Renderize if the element is not a initial element of the array and paint the hr line if the index is valid based on the actualPhase set */}
            {!isEndPointer(index) && <hr className={isValidInTimeLine(index + 1)? 'bg-primary':'bg-base-200'}/>}
        </li>
    );
}

export default StepComponent;