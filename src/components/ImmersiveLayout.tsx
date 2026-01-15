import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Clock } from 'lucide-react';
import { ClockCard } from '../components/ClockCard';
import { useWorldTime } from '../hooks/useWorldTime';
import { useTheme } from '../hooks/useTheme';

interface ImmersiveLayoutProps {
    children: ReactNode;
    onCitySelect?: (cityId: string) => void;
}

export function ImmersiveLayout({ children, onCitySelect }: ImmersiveLayoutProps) {
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { cities, searchCities, addFavorite, removeFavorite, isFavorite } = useWorldTime();
    const { isDark } = useTheme();

    const searchResults = searchQuery ? searchCities(searchQuery) : [];

    return (
        <div className={`relative w-full h-screen overflow-hidden flex transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-100'}`}>
            {/* Background 3D View */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>


            {/* Left Panel: Search & Cities */}
            <motion.div
                animate={{ x: leftOpen ? 0 : '-100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative z-10 w-80 h-full backdrop-blur-xl border-r flex flex-col transition-colors duration-500 ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/40 border-gray-200'}`}
            >
                <div className={`p-4 border-b flex items-center gap-2 transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <Search className="text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search territory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`bg-transparent border-none outline-none w-full placeholder-gray-500 font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 px-2">
                        {searchQuery ? 'Search Results' : 'Quick Access'}
                    </h3>
                    {(searchQuery ? searchResults : cities).map(city => (
                        <div
                            key={city.id}
                            className={`w-full p-2 rounded-lg transition-all flex items-center justify-between group ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                        >
                            <button
                                onClick={() => onCitySelect?.(city.id)}
                                className="flex-1 text-left"
                            >
                                <div className={`font-medium text-sm transition-colors ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'}`}>{city.name}</div>
                                <div className="text-[10px] text-gray-500 font-mono">{city.timezone}</div>
                            </button>
                            <button
                                onClick={() => isFavorite(city.id) ? removeFavorite(city.id) : addFavorite(city.id)}
                                className={`p-2 rounded-md transition-colors ${isFavorite(city.id) ? 'text-cyan-500 hover:bg-cyan-500/10' : 'text-gray-500 hover:bg-black/5 dark:hover:bg-white/10'}`}
                                title={isFavorite(city.id) ? "Untrack" : "Track"}
                            >
                                <Clock size={14} fill={isFavorite(city.id) ? "currentColor" : "none"} />
                            </button>
                        </div>
                    ))}
                    {searchQuery && searchResults.length === 0 && (
                        <div className="text-gray-500 text-xs text-center py-8">No territories found</div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setLeftOpen(!leftOpen)}
                    className={`absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-16 backdrop-blur-xl border-y border-r rounded-r-xl flex items-center justify-center transition-colors ${isDark ? 'bg-black/40 border-white/10 text-white/50 hover:text-white' : 'bg-white/40 border-gray-200 text-gray-400 hover:text-black'}`}
                >
                    {leftOpen ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </motion.div>

            {/* Center Spacer (Click through) */}
            <div className="flex-1 pointer-events-none" />

            {/* Right Panel: Favorites */}
            <motion.div
                animate={{ x: rightOpen ? 0 : '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative z-10 w-80 h-full backdrop-blur-xl border-l flex flex-col transition-colors duration-500 ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/40 border-gray-200'}`}
            >
                <div className={`p-4 border-b flex items-center justify-between transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <h2 className={`text-sm font-bold flex items-center gap-2 tracking-widest transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Clock size={14} className="text-gray-400" />
                        TRACKED
                    </h2>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${isDark ? 'text-gray-500 bg-white/5' : 'text-gray-600 bg-black/5'}`}>
                        {cities.length}
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {cities.map(city => (
                        <ClockCard
                            key={city.id}
                            city={city}
                            variant="compact"
                            onRemove={() => removeFavorite(city.id)}
                        />
                    ))}
                    {cities.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 opacity-30">
                            <Clock size={48} className="text-gray-500" />
                            <div className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-900'}`}>No systems tracked</div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setRightOpen(!rightOpen)}
                    className={`absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 backdrop-blur-xl border-y border-l rounded-l-xl flex items-center justify-center transition-colors ${isDark ? 'bg-black/40 border-white/10 text-white/50 hover:text-white' : 'bg-white/40 border-gray-200 text-gray-400 hover:text-black'}`}
                >
                    {rightOpen ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </motion.div>
        </div>
    );
}
