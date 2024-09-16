import React, { memo } from "react";
import { Modal } from "../modal";

type ConfirmModalProps = {
  isOpened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  disabled?: boolean;
};

export const ConfirmModal = memo(function ConfirmModal({
  isOpened,
  onClose,
  title,
  content,
  onConfirm,
  disabled,
}: ConfirmModalProps) {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Header title={title} onClose={onClose} />
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer
        disabled={disabled}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </Modal>
  );
});
