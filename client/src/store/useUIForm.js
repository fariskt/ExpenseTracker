import { create } from "zustand";

const useUIStore = create((set) => ({
  showForm: "",
  setShowForm: (value) => set({ showForm: value }),
}));

export default useUIStore;
