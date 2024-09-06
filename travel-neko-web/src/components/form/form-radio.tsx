import React, { memo } from "react";
import { FieldError, FieldValues, Path, useFormContext } from "react-hook-form";

interface IFormRadioProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  label: string;
  name: TName;
  value: string;
  error?: FieldError;
  valueAsNumber?: boolean;
  checked?: boolean;
}

export const FormRadio = memo(
  ({ label, name, value, checked }: IFormRadioProps) => {
    const { register } = useFormContext();
    const nameString = name.toString();
    return (
      <div className="flex items-center">
        <input
          checked={checked}
          id={nameString}
          type="radio"
          value={value}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          {...register(name)}
        />
        <label
          htmlFor={nameString}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    );
  },
);

FormRadio.displayName = "FormRadio";
