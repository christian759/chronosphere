import { useWorldTime } from '../hooks/useWorldTime';
import { ClockCard } from '../components/ClockCard';
import { motion } from 'framer-motion';

export function Favorites() {
    const { cities } = useWorldTime();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
                    My Clocks
                </h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
                    + Add City
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city, idx) => (
                    <motion.div
                        key={city.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * idx }}
                    >
                        <ClockCard city={city} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
