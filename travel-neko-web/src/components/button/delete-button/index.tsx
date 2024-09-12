import { memo, MouseEventHandler } from "react";

type DeleteButtonProps = {
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DeleteButton = memo(function DeleteButton({
  label,
  onClick,
}: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="select-none space-x-2 rounded-lg border px-8 py-4"
    >
      <span>🗑️</span>
      {label && <span>{label}</span>}
    </button>
  );
});
