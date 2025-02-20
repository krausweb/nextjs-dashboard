'use client';

import { useThemeStore } from "@/app/lib/store-zustand";
import ThemeSwitcher from "@/app/[lng]/components/zustand/theme-switcher-zustand";
// import { useEffect, useState } from "react";

export default function Page() {
    const theme = useThemeStore(store => store.mode);

    /* 
    * It doesn't work with NextJS framework. This way is for clean React app
    const [theme, setTheme] = useState('light');    
    useEffect(() => {
        setTheme(useThemeStore.getState().mode);
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
                Theme mode inside parent <b>Page</b> client component: <b>{theme}</b>
            </p>

            <ThemeSwitcher />
        </div>
    );
}