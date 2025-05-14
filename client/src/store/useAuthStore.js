import {create} from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  userLoading: true, // start as loading
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
