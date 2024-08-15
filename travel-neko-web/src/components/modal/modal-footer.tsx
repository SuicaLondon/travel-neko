import React from "react";

type ModalFooter = {
  confirmLabel?: string;
  closeLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ModalFooter({
  confirmLabel = "Confirm",
  closeLabel = "Close",
  onConfirm,
  onClose,
}: ModalFooter) {
  return (
    <div className="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
      <button
        type="button"
        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onConfirm}
      >
        {confirmLabel}
      </button>
      <button
        type="button"
        className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        onClick={onClose}
      >
        {closeLabel}
      </button>
    </div>
  );
}
