import { useDialogStore } from "@/store";

export function ModalProvider() {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map(({ Component, modalProps }, index) => (
        <Component
          key={index}
          {...modalProps}
        />
      ))}
    </>
  );
}
