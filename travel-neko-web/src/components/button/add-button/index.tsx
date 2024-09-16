import clsx from "clsx";
import { memo, MouseEventHandler } from "react";

type AddButtonProps = {
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const AddButton = memo(function AddButton({
  label,
  onClick,
  disabled,
}: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "select-none space-x-2 rounded-lg border px-8 py-4",
        disabled ? "cursor-not-allowed bg-gray-100 dark:bg-gray-600" : "",
      )}
      disabled={disabled}
    >
      <span>+</span>
      {label && <span>{label}</span>}
    </button>
  );
});
