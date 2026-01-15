import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Globe, Settings, Heart, Info } from 'lucide-react';
import { cn } from '../utils/cn';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '../hooks/useTheme';

const NAV_ITEMS = [
    { path: '/', label: 'Home', icon: Clock },
    { path: '/globe', label: 'Globe', icon: Globe },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
];

export function Navbar() {
    const location = useLocation();
    const { isDark } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b transition-colors duration-500 ${isDark ? 'bg-black/20 border-white/10' : 'bg-white/40 border-gray-200'}`}
        >
            <Link to="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-400 dark:from-gray-200 dark:to-white animate-spin-slow group-hover:animate-pulse">
                    <div className="absolute inset-0 bg-white dark:bg-black blur-md opacity-20 group-hover:opacity-40" />
                </div>
                <span className={`text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r tracking-wider transition-colors duration-500 ${isDark ? 'from-gray-100 to-gray-400' : 'from-gray-900 to-gray-600'}`}>
                    CHRONOSPHERE
                </span>
            </Link>

            <div className="flex items-center gap-6">
                <div className={`hidden md:flex items-center gap-1 rounded-full p-1 border transition-colors duration-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-gray-200'}`}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                    isActive
                                        ? (isDark ? "text-white" : "text-black")
                                        : (isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black")
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navPill"
                                        className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon size={16} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <ThemeSwitcher />
            </div>
        </motion.nav>
    );
}
