import { HTMLInputTypeAttribute, memo } from "react";
import { FieldError, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormError } from "./form-error";
import clsx from "clsx";

interface IFormFileFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  placeholder: string;
  label: string;
  name: TName;
  error?: FieldError;
  disabled?: boolean;
}
export const FormFileField = memo(
  <Schema extends FieldValues>({
    placeholder,
    label,
    name,
    error,
    disabled,
  }: IFormFileFieldProps<Schema>) => {
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
          type="file"
          className={clsx(
            "block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400",
            disabled ? "cursor-not-allowed bg-gray-100 dark:bg-gray-600" : "",
          )}
          id={nameString}
          placeholder={placeholder}
          {...register(name)}
          disabled={disabled}
        />
        <FormError message={error?.message} />
      </>
    );
  },
);

FormFileField.displayName = "FormFileField";
