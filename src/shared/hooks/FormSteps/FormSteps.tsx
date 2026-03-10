import { useState } from "react";
import type { Step } from "./interfaces/StepInterface.interface";

export const useSteps = (steps: Step[]) => {
        const totalPhases: Step[] = steps;
        const [actualPhase, setActualPhase] = useState<number>(0); //The index value of a position based on the array
    
        const nextPhase = () => {
            //Verify if that index exists and is valid in the array length
            if(!totalPhases[actualPhase] || actualPhase + 1 > totalPhases.length) throw Error('The element not exists or the index is out of array elements');
            setActualPhase(actualPhase + 1);
        }
    
        const prevPhase = () => {
            if(actualPhase - 1 < 0) throw Error('You cant go back of 0');
            setActualPhase(prev => prev - 1);
        }
    
        /**
         * Checks if the index given is located at the start of array.
         * @param index 
         */
        const isStartPointer = (index: number) => {
            return index === 0;
        }
    
        /**
         * Checks if the index given is located at the start of array.
         * @param index 
         */
        const isEndPointer = (index: number) => {
            return index === totalPhases.length - 1;
        }
    
        /**
         * Check if the index given is valid based on the actual phase.
         * @param index - A index value
         * @returns True if the index value is valid in that timeline false otherwise
         */
        const isValidInTimeLine = (index: number) => {
            console.log(`Input index: ${index} - Actual Phase: ${actualPhase} = ${index <= actualPhase}`);
            return index <= actualPhase;
        }
    
        /**
         * Get the element from main array using the actual phase state
         * @returns 
         */
        const getActualStep = (): Step => {
            return totalPhases[actualPhase];
        }

        return {getActualStep, nextPhase, prevPhase, isValidInTimeLine, isEndPointer, isStartPointer, totalPhases, actualPhase};
}