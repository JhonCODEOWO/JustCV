import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form";
import type { LevelRateInputValue } from "./components/LevelRateComponent/interfaces/LevelRateValue.interface";
import LevelRateComponent from "./components/LevelRateComponent/LevelRateComponent.component";

interface LevelRateInputComponentProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    rateElements: LevelRateInputValue[];
    errors: FieldErrors<T>
    label: string;
}

function LevelRateInputComponent<T extends FieldValues>({control, name, rateElements, errors, label}: LevelRateInputComponentProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <fieldset className="fieldset">
          <legend className="fieldset-legend">{label}</legend>
          <LevelRateComponent<T>
            rateElements={rateElements}
            field={field}
            orientation="horizontal"
            errors={errors}
          />
        </fieldset>
      )}
    />
  );
}

export default LevelRateInputComponent;
