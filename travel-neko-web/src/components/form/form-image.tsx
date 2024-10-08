import { memo, useEffect, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FormError } from "./form-error";
import clsx from "clsx";

interface IFormImageFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  name: TName;
  error?: FieldError;
  disabled?: boolean;
}

export const FormImageField = memo(
  ({ name, error, disabled }: IFormImageFieldProps) => {
    const [preview, setPreview] = useState<File | null>(null);
    const { register, control, trigger, getValues, resetField } =
      useFormContext();
    const result = useWatch({ control, name });
    const nameString = name.toString();

    useEffect(() => {
      if (result) {
        trigger(name).then((validated) => {
          if (validated) {
            setPreview(result[0]);
          }
        });
      }
    }, [getValues, name, preview, resetField, result, trigger]);

    if (preview) {
      return (
        <img
          className="flex w-full items-center justify-center"
          src={URL.createObjectURL(preview)}
          alt="Uploaded Image"
        />
      );
    }
    return (
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor={nameString}
          className={clsx(
            "flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800",
            disabled ? "cursor-not-allowed bg-gray-100 dark:bg-gray-600" : "",
          )}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
            <FormError message={error?.message} />
          </div>
          <input
            id={nameString}
            type="file"
            className="hidden"
            disabled={disabled}
            {...register(name)}
          />
        </label>
      </div>
    );
  },
);

FormImageField.displayName = "FormImageField";
