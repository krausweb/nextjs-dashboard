'use client';

import { useAppStore } from "@/app/[lng]/StoreProviderZustand";

const ThemeSwitcher = () => {
	const theme = useAppStore((state) => state.mode);
	const toggleTheme = useAppStore((state) => state.toggleTheme);

	const changeTheme = () => {
		toggleTheme();
	};

	const isDarkMode = theme === "dark";

	return (
		<div className="flex items-center gap-2 dark:text-white">
			<div>Theme mode inside <b>ThemeSwitcher</b> client component: <b>{theme}</b></div>
			<div className="flex items-center">
				<input
					type="radio"
					id="light"
					name="theme"
					value="light"
					checked={!isDarkMode}
					onChange={changeTheme}
					className="mr-2"
				/>
				<label htmlFor="light">Light</label>
			</div>
			<div className="flex items-center">
				<input
					type="radio"
					id="dark"
					name="theme"
					value="dark"
					checked={isDarkMode}
					onChange={changeTheme}
					className="mr-2"
				/>
				<label htmlFor="dark">Dark</label>
			</div>
		</div>
	);
}

export default ThemeSwitcher;