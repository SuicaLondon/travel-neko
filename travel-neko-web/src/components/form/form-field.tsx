import { HTMLInputTypeAttribute, memo } from "react";
import { FieldError, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormError } from "./form-error";

interface IFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  name: TName;
  error?: FieldError;
  valueAsNumber?: boolean;
}
export const FormField = memo(
  <Schema extends FieldValues>({
    type,
    placeholder,
    label,
    name,
    error,
    valueAsNumber,
  }: IFormFieldProps<Schema>) => {
    const { register } = useFormContext();
    const nameString = name.toString();
    return (
      <>
        <label
          htmlFor={nameString}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id={nameString}
          type={type}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
        <FormError message={error?.message} />
      </>
    );
  },
);

FormField.displayName = "FormField";
