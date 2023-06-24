import { create } from "zustand";

const useDataStore = create((set) => ({
  data: [],
  setData: () => set((state) => ({ data: state.data })),
}));

export default useDataStore;
