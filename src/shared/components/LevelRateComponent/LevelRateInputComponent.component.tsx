import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form";
import type { LevelRateInputValue } from "./components/LevelRateComponent/interfaces/LevelRateValue.interface";
import LevelRateComponent from "./components/LevelRateComponent/LevelRateComponent.component";

interface LevelRateInputComponentProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    rateElements: LevelRateInputValue[];
    errors: FieldErrors<T>
}

function LevelRateInputComponent<T extends FieldValues>({control, name, rateElements, errors}: LevelRateInputComponentProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LevelRateComponent<T>
          rateElements={rateElements}
          field={field}
          orientation="horizontal"
          errors={errors}
        />
      )}
    />
  );
}

export default LevelRateInputComponent;
