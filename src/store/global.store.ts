import { ROUTES } from "@/routes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface GlobalState {
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

export const useGlobalStore = create<GlobalState>()(persist((set,get) => ({
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