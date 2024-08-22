import { error } from "console";
import React, { memo } from "react";

type FormErrorProps = {
  message?: string;
};

export const FormError = memo(({ message }: FormErrorProps) => {
  if (message)
    return (
      <span className="mt-2 text-sm text-red-600 dark:text-red-500">
        {message}
      </span>
    );
});
FormError.displayName = "FormError";
