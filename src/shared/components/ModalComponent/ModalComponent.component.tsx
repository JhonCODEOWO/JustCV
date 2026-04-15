import { createPortal } from "react-dom";
import './animations.css'
import { useEffect, useRef } from "react";

interface ModalComponentProps {
    title: string;
    titleExtraInfo?:string;
    closeLabel?: string;
    children?: React.ReactNode;
    onCloseModal: () => void;
    onAccept: () => void;
}

function ModalComponent({children, title, onCloseModal, onAccept, closeLabel = 'Cerrar', titleExtraInfo = ''}: ModalComponentProps) {
    const modal = useRef<HTMLElement>(null);
    const mainContainer = useRef<HTMLDivElement>(null);

    /**
     *  
     */
    useEffect(() => {
        const node = mainContainer.current;
        
        if(!node) return;

        const handleAnimationEnd = (e: AnimationEvent) => {
            if(e.animationName === 'fadeOff' && e.target === node) onCloseModal();
        }
        
        node.addEventListener('animationend', handleAnimationEnd)

        return () => {
            node.removeEventListener('animationend', handleAnimationEnd);
        }
    }, [onCloseModal])

    const closingModal = () => {
        modal.current?.classList.add('showDown');
        mainContainer.current?.classList.add('fadeOff');
    }

    return createPortal(
        <div ref={mainContainer} className="fixed inset-0 bg-[#0006] fade" onClick={onCloseModal}>
            <div className="relative w-full h-full">
                <section ref={modal} className="flex gap-y-3 flex-col w-1/2 h-[75%] absolute top-1/2 left-1/2 translate-[-50%] bg-base-100 p-5 rounded showUp" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <h3 className="font-bold text-3xl">{title}</h3>
                        <p>{titleExtraInfo}</p>
                    </div>
                    <div className="overflow-y-auto">
                        {children}
                    </div>
                    <div className="mt-auto flex justify-between">
                        <button className="btn btn-success" onClick={onAccept}>Aceptar</button>
                        <button className="btn bg-base-200" onClick={closingModal}>{closeLabel}</button>
                    </div>
                </section>
            </div>
        </div>
    , document.body);
}

export default ModalComponent;