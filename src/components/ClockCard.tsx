import { motion } from 'framer-motion';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { Clock, MapPin, Users, X } from 'lucide-react';
import { useState } from 'react';

interface ClockCardProps {
    city: CityData;
    onRemove?: () => void;
}

export function ClockCard({ city, onRemove }: ClockCardProps) {
    const { getFormattedTime, getFormattedDate } = useWorldTime();
    const [showRemove, setShowRemove] = useState(false);
    const timeStr = getFormattedTime(city.timezone);
    const dateStr = getFormattedDate(city.timezone);

    const formatPopulation = (pop?: number) => {
        if (!pop) return null;
        if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
        if (pop >= 1000) return `${(pop / 1000).toFixed(0)}K`;
        return pop.toString();
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden group cursor-pointer"
            onMouseEnter={() => setShowRemove(true)}
            onMouseLeave={() => setShowRemove(false)}
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 opacity-0 group-hover:opacity-10 blur-lg transition duration-500 group-hover:duration-200" />

            {/* Remove Button */}
            {onRemove && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: showRemove ? 1 : 0, scale: showRemove ? 1 : 0.8 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="absolute top-3 right-3 z-20 p-1.5 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                    title="Remove city"
                >
                    <X size={14} className="text-white" />
                </motion.button>
            )}

            <div className="relative z-10 flex flex-col">
                {/* City Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-600 dark:text-gray-400" />
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                {city.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {city.country}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Time Display */}
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock size={18} className="text-gray-600 dark:text-gray-400" />
                        <div className="text-4xl md:text-5xl font-bold font-mono text-gray-800 dark:text-white tracking-tight">
                            {timeStr}
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {dateStr}
                    </div>
                </div>

                {/* City Details */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                        {city.timezone}
                    </div>
                    {city.population && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                            <Users size={12} />
                            {formatPopulation(city.population)}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
