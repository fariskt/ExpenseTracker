import { create } from "zustand";

const useTripStore = create((set) => ({
  tripDetails: [],
  setTripDetails: (tripDetails) => set({ tripDetails }),
}));

export default useTripStore;
