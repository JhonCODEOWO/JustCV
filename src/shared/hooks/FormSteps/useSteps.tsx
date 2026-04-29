import { useState } from "react";
import type { Step } from "./interfaces/StepInterface.interface";

export const useSteps = (steps: Step[]) => {
        const totalPhases: Step[] = steps;
        const [actualPhase, setActualPhase] = useState<number>(0); //The index value of a position based on the array
        const canGoNext: boolean = actualPhase < steps.length - 1;
    
        /**
         * Go to the next step based on the actual step index.
         */
        const nextPhase = () => {
            //Verify if that index exists and is valid in the array length
            if(!totalPhases[actualPhase] || actualPhase >= totalPhases.length - 1) throw Error('The element not exists or the index is out of array elements');
            setActualPhase(actualPhase + 1);
        }
    
        /**
         * Navigate to the prev step based on the actual step.
         */
        const prevPhase = () => {
            if(actualPhase - 1 < 0) throw Error('You cant go back of 0');
            setActualPhase(prev => prev - 1);
        }

        /**
         * Navigate to the given index only if the element exists.
         * @param index A valid position index in the array.
         * @returns void
         */
        const goTo = (index: number) => {
            if(!totalPhases[index]) return;
            setActualPhase(index);
        }

        /**
         * Returns a array with all elements before the index given
         * @param index The position to exclude elements after it excluding it too.
         * @returns A array with all elements before the index given
         */
        const elementsBefore = (index: number): Step[] => {
            return totalPhases.slice(0, index);
        }

        const actualStepElement = totalPhases[actualPhase];

        return {actualStepElement, nextPhase, prevPhase, totalPhases, actualPhase, goTo, elementsBefore, canGoNext};
}