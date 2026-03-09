import type { Education } from "../../../../interfaces/CreateCVInterface";

export type EducationTableActions = 'delete' | 'update';

interface EducationTableProps {
    elements: Education[],
    onAction: (action: EducationTableActions, affectedElement: number) => void;
}

function EducationTable({elements, onAction}: EducationTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-xs rounded-box border border-base-content/5 bg-base-100">
                <thead>
                    <tr>
                        <th></th>
                        <th>N. Institución</th>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Fecha de obt.</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {elements.length == 0 && <tr><td colSpan={6} className="text-center">Sin elementos añadidos</td></tr>}
                    {elements.map(({graduationDate, institutionName, titleName, type}, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{institutionName}</td>
                                <td>{titleName}</td>
                                <td>{type}</td>
                                <td>{graduationDate}</td>
                                <td>
                                    <button type="button" className="bnt btn-error" onClick={() => onAction('delete', index)}>Eliminar</button>
                                    <button type="button" className="bnt btn-error" onClick={() => onAction('update', index)}>Editar</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* <tfoot>
                    <tr>
                        <th></th>
                        <th>N. Institución</th>
                        <th>Título</th>
                        <th>Tipo</th>
                        <th>Fecha de obt.</th>
                    </tr>
                </tfoot> */}
            </table>
        </div>
    );
}

export default EducationTable  ;