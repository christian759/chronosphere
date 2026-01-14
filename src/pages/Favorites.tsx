import { useState } from 'react';
import { useWorldTime } from '../hooks/useWorldTime';
import { ClockCard } from '../components/ClockCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, MapPin, X } from 'lucide-react';

export function Favorites() {
    const { cities, allCities, searchCities, addFavorite, removeFavorite, isFavorite } = useWorldTime();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchResults, setSearchResults] = useState(allCities.slice(0, 10));

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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 dark: text-white">
                        My World Clocks
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
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

            {/* Clocks Grid */}
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
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                        No cities added yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Click "Add City" to start tracking time around the world
                    </p>
                </div>
            )}

            {/* Add City Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add World City</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                                >
                                    <X size={24} className="text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search cities or countries..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 dark:focus:ring-gray-400"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Cities List */}
                            <div className="overflow-y-auto max-h-96 p-6">
                                <div className="space-y-2">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((city) => {
                                            const isAdded = isFavorite(city.id);
                                            return (
                                                <button
                                                    key={city.id}
                                                    onClick={() => !isAdded && handleAddCity(city.id)}
                                                    disabled={isAdded}
                                                    className={`w-full p-4 rounded-lg border transition-all text-left ${isAdded
                                                            ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50 cursor-not-allowed'
                                                            : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="font-bold text-gray-900 dark:text-white">
                                                                {city.name}
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                {city.country} • {city.continent}
                                                            </div>
                                                            <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-1">
                                                                {city.timezone}
                                                            </div>
                                                        </div>
                                                        {isAdded && (
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                Added ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
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
