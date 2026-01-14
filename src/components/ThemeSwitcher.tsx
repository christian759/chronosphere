import { Moon, Sun, Monitor, Zap } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'cyberpunk', icon: Zap, label: 'Cyber' },
        { id: 'futuristic', icon: Monitor, label: 'Future' },
    ] as const;

    return (
        <div className="flex items-center gap-2 p-1 bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                        "p-2 rounded-full transition-all duration-300 relative",
                        theme === t.id ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    )}
                    title={t.label}
                >
                    {theme === t.id && (
                        <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 bg-blue-500/80 dark:bg-blue-600/80 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    )}
                    <span className="relative z-10">
                        <t.icon size={18} />
                    </span>
                </button>
            ))}
        </div>
    );
}
