import React, { ReactNode } from "react";

type ModalContainerProps = {
  isOpened: boolean;
  children: ReactNode;
  onClose: () => void;
};

export function ModalContainer({
  isOpened,
  children,
  onClose,
}: ModalContainerProps) {
  if (!isOpened) return null;
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
    >
      <div
        className="fixed left-0 top-0 h-full w-full bg-gray-900 opacity-70 shadow-sm"
        onClick={onClose}
      />

      <div className="relative max-h-full w-full max-w-2xl rounded-lg bg-white dark:bg-gray-700">
        {children}
      </div>
    </div>
  );
}
