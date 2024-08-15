import { MouseEventHandler } from "react";

type AddButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 border rounded-lg select-none"
    >
      +
    </button>
  );
}
