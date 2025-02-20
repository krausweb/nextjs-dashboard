'use client';

import { useThemeStore } from "@/app/lib/store-zustand";

const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const changeTheme = () => {
    toggleTheme();
  };

  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center gap-2">
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