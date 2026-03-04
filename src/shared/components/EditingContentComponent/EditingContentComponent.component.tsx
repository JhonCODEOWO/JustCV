import type React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent.component";

interface EditingContentComponentProps {
    editing: boolean;
    headerContent: React.ReactNode;
    children: React.ReactNode;
    onAccept: () => void;
    onEdit: () => void;
}

/**
 * Component that show and hide children content based on a boolean value, recommended to implement in edit fields.
 * @param param0 
 * @returns 
 */
function EditingContentComponent({editing, children, headerContent, onAccept, onEdit}: EditingContentComponentProps) {
    return (
        <div>
            <div>
                <div className="flex justify-between w-full">
                    <HeaderComponent level={4}>
                        {(!editing)? headerContent: 'Nuevo elemento'}
                    </HeaderComponent>
                    {!editing && <button className="btn btn-info" type="button" onClick={onEdit}>Editar</button>}
                </div>
                {editing 
                    && 
                    <section className="my-3">
                        {children}
                    </section>
                }
                <div>
                    {editing && <button type="button" className="btn btn-success" onClick={onAccept}>Guardar elemento</button> }
                </div>
            </div>
        </div>
    );
}

export default EditingContentComponent;