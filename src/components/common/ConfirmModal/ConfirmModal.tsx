import React from "react";
import Modal, {ModalProps} from "../Modal/Modal";
import Button, {ButtonVariant} from "../Button/Button";

export interface ConfirmModalProps extends ModalProps {
  yesText?: string;
  yesButtonVariant?: ButtonVariant;
  noText?: string;
  noButtonVariant?: ButtonVariant;
  onConfirm: VoidFunction;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const {
    open,
    header,
    yesText,
    yesButtonVariant,
    noText,
    noButtonVariant,
    children,
    onClose,
    onConfirm,
  } = props;

  return (
    <Modal open={open} header={header} onClose={onClose}>
      {children}

      <div className="flex justify-end">
        <div className="flex gap-3 mt-8">
          <Button variant={noButtonVariant || "alternate"} onClick={onClose}>
            {noText || "No"}
          </Button>
          <Button variant={yesButtonVariant || "main"} onClick={onConfirm}>
            {yesText || "Yes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
