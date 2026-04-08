import { createPortal } from "react-dom";

interface ModalComponentProps {
    title: string;
    titleExtraInfo?:string;
    closeLabel?: string;
    children?: React.ReactNode;
    onCloseModal: () => void;
    onAccept: () => void;
}

function ModalComponent({children, title, onCloseModal, onAccept, closeLabel = 'Cerrar', titleExtraInfo = ''}: ModalComponentProps) {
    return createPortal(
        <div className="fixed inset-0 bg-[#0006]" onClick={onCloseModal}>
            <div className="relative w-full h-full">
                <section className="flex gap-y-3 flex-col w-1/2 h-[75%] absolute top-1/2 left-1/2 translate-[-50%] bg-base-100 p-5 rounded" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <h3 className="font-bold text-3xl">{title}</h3>
                        <p>{titleExtraInfo}</p>
                    </div>
                    <div>
                        {children}
                    </div>
                    <div className="mt-auto flex justify-between">
                        <button className="btn btn-success" onClick={onAccept}>Aceptar</button>
                        <button className="btn bg-base-200" onClick={onCloseModal}>{closeLabel}</button>
                    </div>
                </section>
            </div>
        </div>
    , document.body);
}

export default ModalComponent;