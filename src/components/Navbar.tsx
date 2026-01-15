import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Globe, Settings, Heart, Info, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useState } from 'react';

const NAV_ITEMS = [
    { path: '/', label: 'Home', icon: Clock },
    { path: '/globe', label: 'Globe', icon: Globe },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
];

export function Navbar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 backdrop-blur-md border-b bg-black/40 border-white/10"
            >
                <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-white animate-spin-slow group-hover:animate-pulse">
                        <div className="absolute inset-0 bg-black blur-md opacity-20 group-hover:opacity-40" />
                    </div>
                    <span className="text-lg md:text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 tracking-wider">
                        CHRONOSPHERE
                    </span>
                </Link>

                {/* Desktop Menu */}
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

                {/* Mobile Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[45] bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6"
                    >
                        <div className="flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                                            isActive
                                                ? "bg-white/10 text-white border border-white/10"
                                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-xl transition-colors",
                                            isActive ? "bg-white/10 text-white" : "bg-gray-800 text-gray-400"
                                        )}>
                                            <item.icon size={20} />
                                        </div>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="absolute bottom-10 left-6 right-6 p-6 border border-white/5 rounded-2xl bg-white/5">
                            <p className="text-xs text-gray-500 text-center uppercase tracking-widest">
                                v1.0.0 • Digital Horizon
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
