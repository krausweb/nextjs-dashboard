import { createStore } from 'zustand/vanilla';

export type AppState = {
    mode: string,
    loremNumber: number
}

export type AppActions = {
    toggleTheme: () => void,
    loremMethod: () => Promise<void>,
}

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
    mode: 'light',
    loremNumber: 100
}

export const createAppStore = (
    initState: AppState = defaultInitState,
) => {
    return createStore<AppStore>()((set) => ({
        ...initState,
        toggleTheme: () => set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
        loremMethod: async () => { 
            const response = await new Promise((resolve) => setTimeout(resolve, 1000));
            set((state) => ({ loremNumber: state.loremNumber + 1}));
        }
    }))
}
