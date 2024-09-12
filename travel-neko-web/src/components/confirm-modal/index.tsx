import React, { memo } from "react";
import { Modal } from "../modal";

type ConfirmModalProps = {
  isOpened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
};

export const ConfirmModal = memo(function ConfirmModal({
  isOpened,
  onClose,
  title,
  content,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Header title={title} onClose={onClose} />
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer onConfirm={onConfirm} onClose={onClose} />
    </Modal>
  );
});
