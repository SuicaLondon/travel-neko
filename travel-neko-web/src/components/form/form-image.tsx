import { error } from "console";
import React, { memo } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FormError } from "./form-error";

interface FormImageFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  name: TName;
  error?: FieldError;
}

export const FormImageField = memo(({ name, error }: FormImageFieldProps) => {
  const { register, control } = useFormContext();
  const result = useWatch({ control, name });
  const nameString = name.toString();

  if (!!result && result instanceof FileList && result.length > 0) {
    return <img src={URL.createObjectURL(result[0])} alt="Uploaded Image" />;
  }
  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor={nameString}
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
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
          {...register(name)}
        />
      </label>
    </div>
  );
});

FormImageField.displayName = "FormImageField";
