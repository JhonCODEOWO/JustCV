/**
 * Checks if the index given is located at the start of array.
 * @param index
 */
export const isStartPointer = (index: number) => {
  return index === 0;
};

/**
 * Checks if the index given is located at the start of array based on the length given.
 * @param index The index to compare besides the length
 * @param length The total length of a array
 */
export const isEndPointer = (index: number, length: number) => {
  return index === length - 1;
};

/**
 * Check if the index given is valid based on the actual phase which means that all values below the actual step is valid.
 * @param index - A index value
 * @returns True if the index value is valid in that timeline false otherwise
 */
export const isValidInTimeLineRange = (index: number, actualPhase: number) => {
  return index < actualPhase;
};