import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'cyberpunk' | 'futuristic';

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
        root.classList.remove('light', 'dark', 'cyberpunk', 'futuristic');

        // Add current theme
        root.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme]);

    // Specific check for dark mode logic
    const isDark = theme !== 'light';

    return { theme, setTheme, isDark };
}
