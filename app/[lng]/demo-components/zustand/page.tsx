'use client';

import { useAppStore } from "@/app/[lng]/StoreProviderZustand";
import ThemeSwitcher from "@/app/[lng]/demo-components/zustand/theme-switcher-zustand";
// import { useEffect, useState } from "react";

export default function Page() {
    const { mode, loremNumber, loremMethod } = useAppStore(
        (state) => state
    );
    /*
    * It doesn't work with NextJS framework. This way is for clean React app
    const [theme, setTheme] = useState('light');    
    useEffect(() => {
        setTheme(useAppStore.getState().mode);
    }, []);    
    */

    return (
        <div>
            <h1>Zustand inside Client Component</h1>
            <p>It works fine <b>ONLY</b> with Client Components NOT Server!!! See old tread about Server Components
                <a className="text-blue-500 inline-block" href="https://github.com/pmndrs/zustand/discussions/2200">Using Zustand in React Server Components - misguided misinformation and misuse? #2200</a>
                and details
                <a className="text-blue-500 inline-block" href="https://zustand.docs.pmnd.rs/guides/nextjs">Setup with Next.js</a>
            </p>
            <p>
                Theme mode inside parent <b>Page</b> client component: <b>{mode}</b>
            </p>
            <p>Lorem data from store: <b>{loremNumber}</b></p>
            <p>Async Method to update Lorem data: 
                <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400" onClick={loremMethod}>Update</button>
            </p>

            <ThemeSwitcher />
        </div>
    );
}