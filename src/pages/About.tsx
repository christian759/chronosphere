import { Code, Box, Layers, Cpu, Github, Linkedin } from 'lucide-react';

export function About() {
    const stacks = [
        { icon: Code, label: 'React + TypeScript', desc: 'Core framework & type safety' },
        { icon: Box, label: 'Three.js / R3F', desc: '3D rendering engine' },
        { icon: Layers, label: 'TailwindCSS', desc: 'Utility-first styling' },
        { icon: Cpu, label: 'Framer Motion', desc: 'Animation library' },
    ];

    return (
        <div className="space-y-16 max-w-4xl mx-auto text-center mt-8 pb-20">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                    About ChronoSphere
                </h1>
                <p className="text-xl text-gray-400">
                    A demonstration of modern web technologies blending utility with futuristic aesthetics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stacks.map((item) => (
                    <div key={item.label} className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/10 transition">
                        <div className="p-4 bg-gray-500/10 rounded-full text-gray-300">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.label}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="pt-12 space-y-8 border-t border-white/10">
                <div className="space-y-4">
                    <h2 className="text-2xl font-display font-bold text-white">Built by c2</h2>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Crafting immersive digital experiences through advanced code and artistic design.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-6">
                    <a
                        href="https://github.com/christian759"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition shadow-lg hover:shadow-white/5"
                    >
                        <Github size={20} />
                        <span>GitHub</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/christian-eighemhenrio-1b77b63a2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition shadow-lg hover:shadow-cyan-500/10"
                    >
                        <Linkedin size={20} className="text-[#0a66c2]" />
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
