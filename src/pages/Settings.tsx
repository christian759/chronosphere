import { ThemeSwitcher } from '../components/ThemeSwitcher';

export function Settings() {
    return (
        <div className="max-w-2xl mx-auto space-y-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">Settings</h1>

            <div className="space-y-6">
                <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Theme</span>
                        <ThemeSwitcher />
                    </div>
                </section>

                <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 opacity-70 cursor-not-allowed">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Time Format (24h)</span>
                            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Show Seconds</span>
                            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center text-xs text-gray-500">
                    v1.0.0 • ChronoSphere
                </div>
            </div>
        </div>
    );
}
