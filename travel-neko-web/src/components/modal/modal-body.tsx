import React, { ReactNode } from "react";

type ModalBodyProps = {
  children: ReactNode;
};

export function ModalBody({ children }: ModalBodyProps) {
  return <div className="space-y-4 p-4 md:p-5">{children}</div>;
}
