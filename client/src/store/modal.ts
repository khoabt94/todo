import { Common } from '@/interfaces';
import { ElementType } from 'react';
import { create } from 'zustand';

type IDialogStore = {
  dialogs: Common.ModalBaseData[];
  openDialog: (_element: ElementType, _props: Common.ModalProps) => void;
  removeAll: () => void;
};

export const useDialogStore = create<IDialogStore>((set) => ({
  dialogs: [],

  openDialog: (Component, modalProps) => set((state) => ({
    dialogs: [...state.dialogs, { Component, modalProps }],
  })),
  removeAll: () => {
    set({ dialogs: [] });
  },
}));
