"use client";

import { create } from "zustand";
import { authService } from "@/services/auth.service";
import { setUnauthorizedHandler } from "@/lib/axios";
import {
  LoginCredentials,
  PublicUser,
  RegisterCredentials,
} from "@/types/api.types";
import { HttpError } from "@/lib/httpError";
import { AxiosError, AxiosResponse } from "axios";

interface AuthState {
  user: PublicUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: PublicUser | null) => void;
  reset: () => void;
  error: string | null;
  fetchUser: () => Promise<void>;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const useAuthStore = create<AuthState>((set, get) => {
  setUnauthorizedHandler(() => {
    get().reset();
  });

  return {
    ...initialState,

    setUser: (user) =>
      set({
        user,
        isAuthenticated: user !== null,
      }),

    reset: () => set({ ...initialState }),

    login: async (credentials) => {
      set({ loading: true });

      try {
        const data = await authService.login<{message: string, user: PublicUser}>(credentials);
        const userData= data.user
        set({ isAuthenticated: true, loading: false ,user:userData});
      } catch (error) { 
        set({error: error instanceof AxiosError ? error.response?.data.error ?? "An unexpected error occurred" : "An unexpected error occurred"});
        
          throw error instanceof AxiosError
          ? error
          : new HttpError(400, { error: "Login failed." });
      }finally{
        set({ loading: false });
      }
    },

    register: async (credentials) => {
      set({ loading: true });

      try {
        await authService.register(credentials);
      } catch (error) {
        set({error: error instanceof AxiosError ? error.response?.data.error ?? "An unexpected error occurred" : "An unexpected error occurred"});
        throw error instanceof HttpError
          ? error
          : new HttpError(400, { error: "Registration failed." });
      }finally{
        set({ loading: false });
      }
    },

    logout: async () => {
      set({ loading: true });

      try {
        await authService.logout();
      } catch (error) {
        if (!(error instanceof HttpError && error.status === 401)) {
          set({ loading: false });
          throw error;
        }
      } finally {
        set({ ...initialState });
      }
    },
    fetchUser: async () => {
      try {
        const user = await authService.me<Promise<PublicUser>>();
        set({ user, isAuthenticated: true });
      } catch (error) {
        set({ user: null, isAuthenticated: false });
      }
    },
  };
});

export const authStore = useAuthStore;
