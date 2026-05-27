import { useState } from "react";
import EditingContentComponent from "../EditingContentComponent/EditingContentComponent.component";

interface FieldArrayElementComponentProps {
    /** The form content of the field array element */
    children: React.ReactNode;
    title: string;
    onDelete: (index: number) => void;
    /** A optional function reference to execute operations from the parent if is necessary*/
    onCollapse?: () => Promise<void>;
    index: number;
    /** The flag to show error or success icon */
    isValid: boolean;
}

function FieldArrayElementComponent({title, children, onDelete, isValid, index, onCollapse}: FieldArrayElementComponentProps) {
    const [editing, setEditing] = useState(false);
    const onClickCollapse = () => {
        setEditing(false);
        if(onCollapse) onCollapse();
    }
    return ( 
        <EditingContentComponent
            headerContent={
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-1.5 items-center">
                    {
                        isValid
                        ?
                            <p className="text-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                                <path d="M0 0h512v512H0z" fill="none" />
                                <path fill="currentColor" fillRule="evenodd" d="M256 42.667C138.18 42.667 42.667 138.18 42.667 256S138.18 469.334 256 469.334S469.334 373.82 469.334 256S373.821 42.667 256 42.667m80.336 137.114l30.167 30.167l-131.836 132.388l-79.083-79.083l30.166-30.167l48.917 48.917z" />
                                </svg>
                            </p>
                        :
                            <div className="text-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="currentColor" d="M12.713 16.713Q13 16.425 13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17t.713-.288M11 13h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                            </svg>
                            </div>
                    }
                    <p>{title}</p>
                    </div>
                    
                    <button
                        onClick={() => onDelete(index)}
                        type="button"
                        className="text-error cursor-pointer"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        >
                        <path
                            fill="currentColor"
                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                        />
                        </svg>
                    </button>
                </div>
            }
            editing={editing}
            onAccept={onClickCollapse}
            onEdit={() => setEditing(true)}
        >
            {children}
        </EditingContentComponent>
     );
}

export default FieldArrayElementComponent;