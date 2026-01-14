import { motion } from 'framer-motion';
import { useWorldTime } from '../hooks/useWorldTime';
import { Globe } from '../components/Globe';
import { ClockCard } from '../components/ClockCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    const { cities } = useWorldTime();

    // Feature only the first 3 cities
    const featuredCities = cities.slice(0, 3);

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-600 to-gray-400 dark:from-white dark:via-gray-300 dark:to-gray-500 mb-6 drop-shadow-lg">
                            TIME <br />
                            REIMAGINED
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed">
                            Experience the world's pulse with ChronoSphere. interactive 3D visualizations, real-time synchronization, and futuristic aesthetics.
                        </p>

                        <div className="flex gap-4">
                            <Link to="/globe" className="px-8 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-white text-white dark:text-black rounded-full font-medium transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-2">
                                Launch Globe <ArrowRight size={18} />
                            </Link>
                            <Link to="/about" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-gray-800 dark:text-white rounded-full font-medium transition-all">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-[500px] w-full relative"
                >
                    {/* Globe Container */}
                    <div className="absolute inset-0 bg-gray-500/5 rounded-full blur-[100px]" />
                    <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm bg-black/20">
                        <Globe />
                    </div>
                </motion.div>
            </section>

            {/* Featured Clocks */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Global Pulse</h2>
                    <Link to="/favorites" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-sm font-medium">View All Cities</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredCities.map((city, idx) => (
                        <motion.div
                            key={city.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <ClockCard city={city} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
