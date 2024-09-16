import React, { memo } from "react";
import { FormRadio } from "./form-radio";
import { FieldError } from "react-hook-form";
import { FormError } from "./form-error";

export type FormRadioGroupConfig = {
  label: string;
  value: string;
};

type FormRadioGroupProps = {
  name: string;
  configs: FormRadioGroupConfig[];
  error?: FieldError;
  disabled?: boolean;
};

export const FormRadioGroup = memo(
  ({ name, configs, error, disabled }: FormRadioGroupProps) => {
    return (
      <>
        <div className="flex space-x-4">
          {configs.map((config) => {
            return (
              <FormRadio
                key={config.label}
                label={config.label}
                name={name}
                value={config.value}
                disabled={disabled}
              />
            );
          })}
        </div>
        <FormError message={error?.message} />
      </>
    );
  },
);

FormRadioGroup.displayName = "FormRadioGroup";
