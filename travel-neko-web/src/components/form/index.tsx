import { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { FormError } from "./form-error";
import { FormField } from "./form-field";
import { FormFileField } from "./form-file";
import { FormImageField } from "./form-image";
import { FormRadio } from "./form-radio";
import { FormRadioGroup } from "./form-radio-group";

interface FormContainerProps {
  methods: UseFormReturn<any, any, undefined>;
  children: ReactNode;
  onSubmit: () => void;
}
const FormContainer = ({ children, onSubmit, methods }: FormContainerProps) => {
  return (
    <FormProvider {...methods}>
      <form className="flex max-w-xl flex-col space-y-2" onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};

export const Form = Object.assign(FormContainer, {
  FormField,
  FormFileField,
  FormImageField,
  FormRadio,
  FormRadioGroup,
  FormError,
});
