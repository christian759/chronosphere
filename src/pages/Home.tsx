import { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useWorldTime } from '../hooks/useWorldTime';
import { Globe } from '../components/Globe';
import { ClockCard } from '../components/ClockCard';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import {
    Search,
    Plus,
    MapPin,
    X,
    Clock,
    ArrowDown,
    Code,
    Box,
    Layers,
    Cpu,
    Settings as SettingsIcon,
    Info,
    Heart
} from 'lucide-react';

export function Home() {
    const { cities, allCities, searchCities, addFavorite, removeFavorite, isFavorite } = useWorldTime();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchResults, setSearchResults] = useState(allCities.slice(0, 10));

    // Scroll Progress for "Wonderful" scroll indicator
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            setSearchResults(searchCities(query));
        } else {
            setSearchResults(allCities.slice(0, 10));
        }
    };

    const handleAddCity = (cityId: string) => {
        addFavorite(cityId);
        setShowAddModal(false);
        setSearchQuery('');
        setSearchResults(allCities.slice(0, 10));
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const stacks = [
        { icon: Code, label: 'React + TypeScript', desc: 'Core framework & type safety' },
        { icon: Box, label: 'Three.js / R3F', desc: '3D rendering engine' },
        { icon: Layers, label: 'TailwindCSS', desc: 'Utility-first styling' },
        { icon: Cpu, label: 'Framer Motion', desc: 'Animation library' },
    ];

    return (
        <div className="relative bg-black text-white selection:bg-cyan-500/30">
            {/* Custom Smooth Scroll Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Hero / Globe Section */}
            <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Globe />
                </div>

                <div className="relative z-10 text-center space-y-6 pointer-events-none px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 select-none">
                            CHRONOSPHERE
                        </h1>
                        <p className="text-cyan-400 font-mono text-xs tracking-[1em] uppercase mt-4 opacity-70">
                            Global Time Synchronization System
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Explore</span>
                    <ArrowDown size={20} />
                </motion.div>
            </section>

            {/* Favorites / Clocks Section */}
            <section className="min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-gradient-to-b from-black to-gray-900/50">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={sectionVariants}
                    className="space-y-12"
                >
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 text-cyan-500 mb-2">
                                <Heart size={20} />
                                <span className="font-mono text-xs tracking-widest uppercase">Tracked Nodes</span>
                            </div>
                            <h2 className="text-5xl font-display font-bold">World Clocks</h2>
                            <p className="text-gray-400 mt-4 max-w-xl">
                                Monitoring {cities.length} global nodes with sub-millisecond precision. Add secondary territories to your local monitoring grid.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Plus size={20} />
                                INITIALIZE NODE
                            </span>
                            <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>

                    {cities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cities.map((city, idx) => (
                                <motion.div
                                    key={city.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <ClockCard city={city} onRemove={() => removeFavorite(city.id)} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
                            <MapPin className="mx-auto text-gray-700 mb-6" size={64} />
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">
                                No nodes currently active
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Deploy your first monitoring node to start tracking global temporal shifts.
                            </p>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* About Section */}
            <section className="min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={sectionVariants}
                    className="space-y-16"
                >
                    <div className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-3 text-cyan-500 mb-2">
                            <Info size={20} />
                            <span className="font-mono text-xs tracking-widest uppercase">System Core</span>
                        </div>
                        <h2 className="text-5xl font-display font-bold">About ChronoSphere</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            A high-fidelity temporal visualization interface built for the modern global landscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stacks.map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center text-center gap-6 hover:bg-white/10 transition group"
                            >
                                <div className="p-5 bg-cyan-500/10 rounded-2xl text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-500">
                                    <item.icon size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{item.label}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Settings Section */}
            <section className="py-32 px-6 md:px-12 border-t border-white/5 bg-gray-900/30">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={sectionVariants}
                    className="max-w-2xl mx-auto space-y-12"
                >
                    <div className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-3 text-cyan-500 mb-2">
                            <SettingsIcon size={20} />
                            <span className="font-mono text-xs tracking-widest uppercase">Interface Config</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white">Settings</h2>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold">Luminance Profile</h3>
                                <p className="text-sm text-gray-500">Toggle between high and low contrast visual modes.</p>
                            </div>
                            <ThemeSwitcher />
                        </section>

                        <section className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 opacity-50 cursor-not-allowed grayscale">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold">Temporal Format</h3>
                                        <p className="text-sm text-gray-600">Switch between 12h and 24h cycle.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-800 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <div>
                                        <h3 className="text-lg font-bold">Visual Precision</h3>
                                        <p className="text-sm text-gray-600">Enable high-frequency second hand tracking.</p>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-800 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="text-center text-[10px] font-mono text-gray-600 tracking-[0.2em] uppercase pt-12">
                            CHRONOSPHERE v1.8.4 • GLOBAL_SYNC_STABLE
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Add City Modal (Portal-like) */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setShowAddModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative z-10 w-full max-w-3xl bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,242,255,0.1)]"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-3xl font-display font-bold">Initialize Node</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-3 hover:bg-white/10 rounded-2xl transition"
                                >
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH COORDINATES OR TERRITORY..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-16 pr-6 py-5 bg-black border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 font-mono tracking-wider transition-colors"
                                        autoFocus
                                    />
                                </div>

                                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((city) => {
                                            const isAdded = isFavorite(city.id);
                                            return (
                                                <button
                                                    key={city.id}
                                                    onClick={() => !isAdded && handleAddCity(city.id)}
                                                    disabled={isAdded}
                                                    className={`w-full p-5 rounded-2xl border transition-all text-left flex items-center justify-between group ${isAdded
                                                        ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                                                        : 'bg-white/5 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5'
                                                        }`}
                                                >
                                                    <div>
                                                        <div className="font-bold text-lg group-hover:text-cyan-400 transition-colors">
                                                            {city.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 uppercase tracking-widest font-mono mt-1">
                                                            {city.country} • {city.continent}
                                                        </div>
                                                    </div>
                                                    {isAdded ? (
                                                        <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                                                            Node Active
                                                        </span>
                                                    ) : (
                                                        <Plus size={20} className="text-gray-600 group-hover:text-cyan-500" />
                                                    )}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-20 text-gray-600 font-mono uppercase tracking-widest">
                                            NO MATCHING COORDINATES FOUND
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
