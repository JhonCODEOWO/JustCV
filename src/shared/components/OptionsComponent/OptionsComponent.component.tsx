import type React from "react";
import { useRef, useState } from "react";

interface OptionsComponentProps {
    /** HTML element to show in the options */
    children: React.ReactNode;
}

/**
 * Component that render an option button toggle to show the children HTML.
 * @param param0 
 * @returns 
 */
function OptionsComponent({children}:OptionsComponentProps) {
    const optionsParent = useRef<null | HTMLDivElement>(null);
    const [mountedOptions, setMountedOptions] = useState(false); //State to manage if the HTML elements should show or not
    const [active, setActive] = useState(false); //To manage if the options are active or not

    const handleOptionsBtn = (_e: React.MouseEvent<HTMLButtonElement>) => {
        if(!mountedOptions) {
            setMountedOptions(true);
            setActive(true);
        } else {
            setActive(false);
        }
    }

    const handleAnimationEnd = (e: React.AnimationEvent) => {
        if(e.animationName === 'DropDownAnimationOut') setMountedOptions(false);
    }
    return ( 
        <div className="flex justify-center">
            <div className="relative w-fit">
                <button 
                    className={`
                            cursor-pointer 
                            bg-base-200
                            rounded-full
                            ${mountedOptions? 'text-error' : ''} 
                            ${active? 'fromFadeElement': 'fromFadeElementOut'}`
                        } 
                    onClick={handleOptionsBtn}>
                    {
                        !mountedOptions
                            ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8"/></svg>
                                
                            :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.917 2.925q-.277.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.831 7.4 8.404t.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.277-.275.704-.275t.704.275q.3.3.3.713t-.3.687L13.375 12l2.925 2.917q.275.277.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"/></svg>
                    }
                </button>
                {
                    mountedOptions &&
                    <div 
                        onAnimationEnd={handleAnimationEnd}
                        ref={optionsParent} 
                        className={`
                            flex 
                            flex-col 
                            absolute 
                            top-full
                            right-full
                            bg-base-200 
                            rounded 
                            gap-y-1 
                            py-3 
                            px-5 
                            *:hover:bg-base-300 
                            *:py-1.5 
                            *:px-0.5 
                            *:rounded
                            *:transition-colors
                            ${active? 'dropDownAnimation': 'dropDownAnimationOut'}`}>
                        {children}
                    </div>
                }
            </div>
        </div>
     );
}

export default OptionsComponent;