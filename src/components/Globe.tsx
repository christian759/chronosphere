import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';

function GlobeMesh() {
    const globeRef = useRef<THREE.Mesh>(null);
    const { theme } = useTheme();

    // Rotate the globe
    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.001;
        }
    });

    // Dynamic colors based on theme
    const materialProps = useMemo(() => {
        if (theme === 'cyberpunk') {
            return { color: '#2a0a2a', emissive: '#110022', wireframe: true };
        } else if (theme === 'futuristic') {
            return { color: '#001133', emissive: '#001122', wireframe: false, metalness: 0.8, roughness: 0.2 };
        } else if (theme === 'light') {
            return { color: '#ddddff', emissive: '#ffffff', wireframe: false };
        }
        // Default Dark
        return { color: '#1a237e', emissive: '#000022', wireframe: false };
    }, [theme]);

    // Points for cities (Demo: hardcoded points for now)
    // Converting lat/long to 3D position is needed for real implementation
    // x = r * cos(lat) * cos(lon)
    // y = r * sin(lat)
    // z = r * cos(lat) * sin(lon)

    return (
        <group>
            <mesh ref={globeRef} scale={[2.5, 2.5, 2.5]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    {...materialProps}
                />
            </mesh>

            {/* Atmosphere Glow (Simulated with a slightly larger sphere) */}
            <mesh scale={[2.6, 2.6, 2.6]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color={theme === 'cyberpunk' ? '#ff00ff' : '#4488ff'}
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

export function Globe() {
    const { theme } = useTheme();

    return (
        <div className="w-full h-full min-h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={theme === 'cyberpunk' ? '#ff00ff' : '#ffffff'} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <GlobeMesh />
                <OrbitControls enableZoom={true} enablePan={false} minDistance={5} maxDistance={15} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
            <div className="absolute bottom-4 right-4 text-xs text-white/50 pointer-events-none">
                Interactive 3D View
            </div>
        </div>
    );
}
