import { Globe } from '../components/Globe';

export function GlobePage() {
    return (
        <div className="h-[calc(100vh-100px)] w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-black/80 z-[-1]" />
            <Globe />

            <div className="absolute top-8 left-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-sm pointer-events-none">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Satellite View</h2>
                <p className="text-sm text-gray-300">
                    Interactive visualization of global timezones. Drag to rotate, scroll to zoom.
                </p>
            </div>
        </div>
    );
}
