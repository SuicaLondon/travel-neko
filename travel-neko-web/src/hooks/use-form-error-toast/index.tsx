import { useEffect } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useFormErrorToast = (errors: FieldErrors<FieldValues>) => {
  useEffect(() => {
    Object.values(errors).forEach(
      (error) => error && toast.error(error.message?.toString()),
    );
  }, [errors]);
};
