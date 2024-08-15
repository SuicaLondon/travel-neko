import { ModalBody } from "./modal-body";
import { ModalContainer } from "./modal-container";
import ModalFooter from "./modal-footer";
import { ModalHeader } from "./modal-header";

export const Modal = Object.assign(ModalContainer, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
