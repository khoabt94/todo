import { Socket } from 'socket.io-client';
import { create } from 'zustand';

type ISocketStore = {
  socket: Socket | null
  setSocket: (_s: Socket | null) => void;
};

export const useSocketStore = create<ISocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket })
}));
