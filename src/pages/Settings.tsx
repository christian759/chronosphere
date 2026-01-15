import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useWorldTime } from '../hooks/useWorldTime';
import { motion } from 'framer-motion';

export function Settings() {
    const { is12Hour, toggleTimeFormat } = useWorldTime();

    return (
        <div className="max-w-2xl mx-auto space-y-12 mt-8 px-6">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Settings</h1>

            <div className="space-y-6">
                <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Theme</span>
                        <ThemeSwitcher />
                    </div>
                </section>

                <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-300">12-Hour Format</span>
                            <button
                                onClick={toggleTimeFormat}
                                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${is12Hour ? 'bg-cyan-500' : 'bg-gray-700 dark:bg-gray-400'}`}
                            >
                                <motion.div
                                    animate={{ x: is12Hour ? 24 : 0 }}
                                    className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 border-red-500/10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">System Management</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-gray-900 dark:text-white font-medium">Reset Tracking Nodes</div>
                            <div className="text-sm text-gray-500">Clear all favorite systems and restore defaults</div>
                        </div>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to clear all tracked nodes?')) {
                                    localStorage.removeItem('chronosphere-favorites');
                                    window.location.reload();
                                }
                            }}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </section>

                <div className="text-center text-xs text-gray-500 py-4">
                    v1.0.0 • ChronoSphere
                </div>
            </div>
        </div>
    );
}
