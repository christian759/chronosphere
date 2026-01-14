import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                "p-2.5 rounded-full transition-all duration-300 bg-black/10 dark:bg-white/10 backdrop-blur-md border border-white/20",
                "hover:bg-black/20 dark:hover:bg-white/20"
            )}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
        </button>
    );
}
