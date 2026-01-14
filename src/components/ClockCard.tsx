import { motion } from 'framer-motion';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { Clock } from 'lucide-react';

interface ClockCardProps {
    city: CityData;
}

export function ClockCard({ city }: ClockCardProps) {
    const { getFormattedTime } = useWorldTime();
    const timeStr = getFormattedTime(city.timezone);

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden group cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-lg transition duration-500 group-hover:duration-200" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="text-gray-400 dark:text-gray-300 text-sm font-medium tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Clock size={14} className="group-hover:text-blue-400 transition-colors" />
                    {city.name}
                </div>

                <div className="text-4xl md:text-5xl font-bold font-mono text-gray-800 dark:text-white tracking-tighter group-hover:text-glow transition-all duration-300">
                    {timeStr}
                </div>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {city.timezone}
                </div>
            </div>
        </motion.div>
    );
}
