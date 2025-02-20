'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type AppStore, createAppStore } from '@/app/lib/store-zustand'

export type AppStoreApi = ReturnType<typeof createAppStore>

export const StoreContext = createContext<AppStoreApi | undefined>(
    undefined,
)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({
    children,
}: StoreProviderProps) => {
    const storeRef = useRef<AppStoreApi>(null)
    if (!storeRef.current) {
        storeRef.current = createAppStore()
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

export const useAppStore = <T,>(
    selector: (store: AppStore) => T,
): T => {
    const storeContext = useContext(StoreContext)

    if (!storeContext) {
        throw new Error(`useAppStore must be used within StoreProvider`)
    }

    return useStore(storeContext, selector)
}
