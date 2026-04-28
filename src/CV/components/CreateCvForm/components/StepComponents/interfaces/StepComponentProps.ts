import type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import type { StepID } from "../../../CreateCvForm.component";

/**
 * A interface contract that define the usual data to pass by props into child components inside a form
 * handled by react-hook-form.
 */
export interface StepComponentProps<T extends FieldValues> {
    register: UseFormRegister<T>,
    errors: FieldErrors<T>,
    validate: (uuid: StepID) => Promise<void>; //STEP ID SHOULD BE GIVEN FROM THE HOOK useSteps
    prevPhase?: () => void;
}