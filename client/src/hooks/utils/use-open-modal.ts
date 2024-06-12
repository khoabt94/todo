import { Common } from "@/interfaces";
import { useDialogStore } from "@/store";
import { ElementType } from "react";

export function useOpenModal() {
  const { openDialog, removeAll } = useDialogStore();

  const open = (element: ElementType, props: Common.ModalProps) => {
    openDialog(element, {
      ...props,
      onSubmit: () => {
        props.onSubmit?.();
        removeAll();
      },
      onClose: () => {
        props.onClose?.();
        removeAll();
      },
    })
  };

  const closeAll = () => {
    removeAll();
  };

  return { open, closeAll };
}
