import { useState } from 'react';
import { useWorldTime } from '../hooks/useWorldTime';
import { useTheme } from '../hooks/useTheme';
import { ClockCard } from '../components/ClockCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, MapPin, X } from 'lucide-react';

export function Favorites() {
    const { cities, allCities, searchCities, addFavorite, removeFavorite, isFavorite } = useWorldTime();
    const { isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchResults, setSearchResults] = useState(allCities);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            setSearchResults(searchCities(query));
        } else {
            setSearchResults(allCities);
        }
    };

    const handleAddCity = (cityId: string) => {
        addFavorite(cityId);
        setShowAddModal(false);
        setSearchQuery('');
        setSearchResults(allCities);
    };

    return (
        <div className="space-y-8 mt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white transition-colors duration-500">
                        My World Clocks
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-500">
                        Track time across {cities.length} cities worldwide
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-white text-white dark:text-black rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg"
                >
                    <Plus size={20} />
                    Add City
                </button>
            </div>

            {cities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city, idx) => (
                        <motion.div
                            key={city.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.05 * idx }}
                        >
                            <ClockCard city={city} onRemove={() => removeFavorite(city.id)} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <MapPin className="mx-auto text-gray-400 mb-4" size={64} />
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                        No cities added yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-500">
                        Click "Add City" to start tracking time around the world
                    </p>
                </div>
            )}

            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col transition-colors duration-500"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between transition-colors duration-500">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add World City</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <X size={24} className="text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="p-6 border-b border-gray-100 dark:border-white/10 transition-colors duration-500">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search cities or countries..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="overflow-y-auto flex-1 p-6 custom-scrollbar bg-gray-50/5 dark:bg-transparent">
                                <div className="space-y-3">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((city) => {
                                            const isAdded = isFavorite(city.id);
                                            return (
                                                <button
                                                    key={city.id}
                                                    onClick={() => !isAdded && handleAddCity(city.id)}
                                                    disabled={isAdded}
                                                    className={`w-full p-4 rounded-xl border transition-all text-left group ${isAdded
                                                        ? 'bg-gray-100/50 dark:bg-white/5 border-transparent opacity-40 cursor-not-allowed'
                                                        : 'bg-white dark:bg-zinc-800 border-gray-100 dark:border-white/5 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className={`font-bold transition-colors ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-cyan-500`}>
                                                                {city.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {city.country} • {city.continent}
                                                            </div>
                                                            <div className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">
                                                                {city.timezone}
                                                            </div>
                                                        </div>
                                                        {isAdded ? (
                                                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md">
                                                                TRACKED
                                                            </span>
                                                        ) : (
                                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Plus size={20} className="text-cyan-500" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium">
                                            No cities found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
