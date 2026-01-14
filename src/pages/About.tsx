import { Code, Box, Layers, Cpu } from 'lucide-react';

export function About() {
    const stacks = [
        { icon: Code, label: 'React + TypeScript', desc: 'Core framework & type safety' },
        { icon: Box, label: 'Three.js / R3F', desc: '3D rendering engine' },
        { icon: Layers, label: 'TailwindCSS', desc: 'Utility-first styling' },
        { icon: Cpu, label: 'Framer Motion', desc: 'Animation library' },
    ];

    return (
        <div className="space-y-12 max-w-4xl mx-auto text-center">
            <div className="space-y-4">
                <h1 className="text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                    About ChronoSphere
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    A demonstration of modern web technologies blending utility with futuristic aesthetics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stacks.map((item) => (
                    <div key={item.label} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/10 transition">
                        <div className="p-4 bg-blue-500/10 rounded-full text-blue-400">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">{item.label}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
