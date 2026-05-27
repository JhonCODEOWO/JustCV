import type React from "react";

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
            <div className="border border-base-300 bg-base-200 rounded px-3 py-1.5">
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex-1">
                        {headerContent}
                    </div>
                    <div className="ml-3 flex items-center">
                        {
                        editing
                        ?
                            <button type="button" className="rounded-full bg-base-100 cursor-pointer" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAccept();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5z"/></svg>
                            </button> 
                        :
                            <button className="rounded-full bg-base-100 cursor-pointer" type="button" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"/></svg>
                            </button>
                        }
                    </div>
                </div>
                {editing 
                    && 
                    <section className="my-3">
                        {children}
                    </section>
                }
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default EditingContentComponent;