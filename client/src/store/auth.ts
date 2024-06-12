import { User } from '@/interfaces';
import { getMyInfo, refreshToken } from '@/services';
import { create } from 'zustand';
import Cookies from 'js-cookie';
import { COOKIE_KEY } from '@/constants/cookie-key';

type IAuthStore = {
    user: User.Detail | null
    isFetchingUser: boolean;
    setUser: (_user: User.Detail) => void;
    setIsFetchingUser: (_flag: boolean) => void;
    clearUser: () => void;
    getUser: () => void;
    refreshToken: () => void;
};

export const useAuthStore = create<IAuthStore>((set, get) => ({
    user: null,
    isFetchingUser: true,
    setIsFetchingUser: (isFetchingUser: boolean) => set({ isFetchingUser }),
    setUser: (user: User.Detail) => set({ user }),
    clearUser: () => set({ user: null }),
    refreshToken: async () => {
        const accessToken = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
        if (!accessToken) {
            set({ isFetchingUser: false })
            return
        }
        try {
            const res = await refreshToken();
            Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.access_token)
            await get().getUser()
        } catch (error) {
            ///empty
        }
    },
    getUser: async () => {
        try {
            const res = await getMyInfo();
            set({ user: res.user })
        } catch (error) {
            ///empty
        }
    }
}));
