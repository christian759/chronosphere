import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme;
            return saved || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove all theme classes
        root.classList.remove('light', 'dark');

        // Add current theme
        root.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    const isDark = theme === 'dark';

    return { theme, setTheme, isDark };
}
