import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Clock } from 'lucide-react';
import { ClockCard } from '../components/ClockCard';
import { useWorldTime } from '../hooks/useWorldTime';

interface ImmersiveLayoutProps {
    children: ReactNode;
    onCitySelect?: (cityId: string) => void;
}

export function ImmersiveLayout({ children, onCitySelect }: ImmersiveLayoutProps) {
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);
    const { cities } = useWorldTime();

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex">
            {/* Background 3D View */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>

            {/* Top Overlay */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <h1 className="text-3xl font-display font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        CHRONOSPHERE
                    </h1>
                    <div className="text-blue-400 text-xs tracking-[0.3em] font-mono">GLOBAL TIME SYSTEM</div>
                </div>
            </div>

            {/* Left Panel: Search & Cities */}
            <motion.div
                animate={{ x: leftOpen ? 0 : '-100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative z-10 w-80 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col"
            >
                <div className="p-4 border-b border-white/10 flex items-center gap-2">
                    <Search className="text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search territory..."
                        className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 font-mono text-sm"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 px-2">Territories</h3>
                    {cities.map(city => (
                        <button
                            key={city.id}
                            onClick={() => onCitySelect?.(city.id)}
                            className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition flex items-center justify-between group"
                        >
                            <span className="text-gray-300 group-hover:text-white font-medium">{city.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{city.timezone}</span>
                        </button>
                    ))}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setLeftOpen(!leftOpen)}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-16 bg-black/40 backdrop-blur-xl border-y border-r border-white/10 rounded-r-xl flex items-center justify-center text-white/50 hover:text-white transition"
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
                className="relative z-10 w-96 h-full bg-black/40 backdrop-blur-xl border-l border-white/10 flex flex-col"
            >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-white font-bold flex items-center gap-2">
                        <Clock size={16} className="text-blue-400" />
                        TRACKED SYSTEMS
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {cities.slice(0, 3).map(city => (
                        <div key={city.id} className="scale-90 origin-top-left w-full">
                            <ClockCard city={city} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setRightOpen(!rightOpen)}
                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 bg-black/40 backdrop-blur-xl border-y border-l border-white/10 rounded-l-xl flex items-center justify-center text-white/50 hover:text-white transition"
                >
                    {rightOpen ? <ChevronRight /> : <ChevronLeft />}
                </button>
            </motion.div>
        </div>
    );
}
