import { MouseEventHandler } from "react";

type AddButtonProps = {
  label?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="select-none space-x-2 rounded-lg border px-8 py-4"
    >
      <span>+</span>
      {label && <span>{label}</span>}
    </button>
  );
}
