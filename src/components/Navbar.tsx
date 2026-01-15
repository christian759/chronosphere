import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Globe, Settings, Heart, Info } from 'lucide-react';
import { cn } from '../utils/cn';

const NAV_ITEMS = [
    { path: '/', label: 'Home', icon: Clock },
    { path: '/globe', label: 'Globe', icon: Globe },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
];

export function Navbar() {
    const location = useLocation();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b bg-black/20 border-white/10"
        >
            <Link to="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-white animate-spin-slow group-hover:animate-pulse">
                    <div className="absolute inset-0 bg-black blur-md opacity-20 group-hover:opacity-40" />
                </div>
                <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 tracking-wider">
                    CHRONOSPHERE
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 rounded-full p-1 border bg-white/5 border-white/10">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                isActive ? "text-white" : "text-gray-400 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 rounded-full bg-white/10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
