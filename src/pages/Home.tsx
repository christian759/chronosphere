import { motion } from 'framer-motion';
import { useWorldTime } from '../hooks/useWorldTime';
import { Globe } from '../components/Globe';
import { ClockCard } from '../components/ClockCard';
import { ArrowRight, MapPin, Clock, Globe2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
    const { cities, allCities } = useWorldTime();

    // Calculate some interesting stats
    const totalCities = allCities.length;
    const continents = [...new Set(allCities.map(c => c.continent))].length;
    const countries = [...new Set(allCities.map(c => c.country))].length;

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 mb-6 drop-shadow-lg">
                            TIME <br />
                            REIMAGINED
                        </h1>
                        <p className="text-lg text-gray-300 max-w-lg mb-8 leading-relaxed">
                            Experience the world's pulse with ChronoSphere. Track time across {totalCities} major cities with interactive 3D visualizations and real-time synchronization.
                        </p>

                        <div className="flex gap-4">
                            <Link to="/globe" className="px-8 py-3 bg-gray-200 hover:bg-white text-black rounded-full font-medium transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-2">
                                Launch Globe <ArrowRight size={18} />
                            </Link>
                            <Link to="/about" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-full font-medium transition-all">
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

            {/* Stats Section */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                    >
                        <Globe2 className="text-gray-300 mb-4" size={32} />
                        <div className="text-4xl font-bold text-white mb-2">{totalCities}</div>
                        <div className="text-gray-400">Global Cities</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                    >
                        <MapPin className="text-gray-300 mb-4" size={32} />
                        <div className="text-4xl font-bold text-white mb-2">{continents}</div>
                        <div className="text-gray-400">Continents Covered</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                    >
                        <TrendingUp className="text-gray-300 mb-4" size={32} />
                        <div className="text-4xl font-bold text-white mb-2">{countries}</div>
                        <div className="text-gray-400">Countries Tracked</div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Clocks */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Tracked Systems</h2>
                        <p className="text-gray-400">Monitoring global temporal nodes</p>
                    </div>
                    <Link to="/favorites" className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-2">
                        Manage Cities <ArrowRight size={16} />
                    </Link>
                </div>

                {cities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cities.map((city, idx) => (
                            <motion.div
                                key={city.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <ClockCard city={city} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white/10 rounded-2xl border border-white/10">
                        <Clock className="mx-auto text-gray-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-300 mb-2">
                            No nodes active
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Visit the favorites section to initialize primary tracking nodes
                        </p>
                        <Link to="/favorites" className="px-6 py-2 bg-gray-200 text-black rounded-full text-sm font-medium inline-block">
                            Initialize Nodes
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
