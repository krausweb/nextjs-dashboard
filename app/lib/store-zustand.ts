import { create } from "zustand";

type Store = {
    mode: string;
    toggleTheme: () => void;
    toggleThemeAsync: () => Promise<void>;
}

export const useThemeStore = create<Store>((set, get) => ({
    mode: "light",
    toggleTheme: () =>
        set({ mode: get().mode === "light" ? "dark" : "light" }),
        // OR set((state) => ({ mode: (state.mode === "light" ? "dark" : "light") }))
    toggleThemeAsync: async () => { // Mock Async example
        const response = await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ mode: get().mode === "light" ? "dark" : "light" });
    }
}));
