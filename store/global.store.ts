import { ROUTES } from "@/routes";
import { IUser } from "@/types/user.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface GlobalState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  menuState:boolean;
  setMenuState: (menuState: boolean) => void;
  menuItems: typeof ROUTES;
  setMenuItems: (menuItems: typeof ROUTES) => void;
  initialize: () => void;
  locale: string;
  changeLocale: (newLocale:string) => void;
  locales: string[];
  setLocales: (locales: string[]) => void;
}

export const globalStore = create<GlobalState>()(persist((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  menuState: false,
  setMenuState: (menuState) => set({ menuState }),
  menuItems: ROUTES,
  setMenuItems: (menuItems) => set({ menuItems }),
  locale: 'en',
  changeLocale: (newLocale:string) => {

    return set({ locale: newLocale });
  },
  locales: ['en', 'ar'],
  setLocales: (locales) => set({ locales }),
  initialize: () => {
    const savedLocale = localStorage.getItem('locale');
    set({
    user: null,
    menuState: false,
    menuItems: ROUTES,
    locale: savedLocale || 'en',
    locales: ['en', 'ar'],
    setLocales: (locales) => set({ locales }),
  });
  },
}), {
  name: 'global-store',
  storage: createJSONStorage(() => localStorage),
}));