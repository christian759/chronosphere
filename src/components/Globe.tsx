import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { latLongToVector3 } from '../utils/coordinates';

// Simplified continent outlines (sample coordinates for visual effect)
const CONTINENT_PATHS = [
    // North America outline (simplified)
    [
        [-170, 70], [-140, 70], [-120, 60], [-100, 50], [-90, 30], [-80, 25], [-75, 45], [-60, 50], [-50, 60], [-170, 70]
    ],
    // South America outline (simplified)
    [
        [-80, 10], [-70, -10], [-60, -30], [-55, -50], [-70, -55], [-75, -35], [-80, 10]
    ],
    // Europe outline (simplified)
    [
        [-10, 50], [0, 60], [20, 70], [40, 60], [30, 50], [20, 45], [10, 40], [-10, 50]
    ],
    // Africa outline (simplified)
    [
        [-20, 35], [0, 30], [30, 20], [40, 0], [40, -20], [20, -35], [10, -30], [5, -10], [-20, 10], [-20, 35]
    ],
    // Asia outline (simplified)
    [
        [40, 70], [60, 75], [100, 70], [140, 60], [150, 40], [140, 20], [120, 10], [100, 0], [80, 10], [60, 20], [40, 30], [40, 70]
    ],
    // Australia outline (simplified)
    [
        [110, -10], [130, -12], [150, -25], [145, -40], [130, -35], [115, -30], [110, -10]
    ]
];

function ContinentLines({ radius = 2.5 }: { radius?: number }) {
    return (
        <>
            {CONTINENT_PATHS.map((path, idx) => {
                const points = path.map(([lng, lat]) => {
                    const vec = latLongToVector3(lat, lng, radius + 0.01);
                    return new THREE.Vector3(vec[0], vec[1], vec[2]);
                });

                return (
                    <Line
                        key={idx}
                        points={points}
                        color="#444444"
                        lineWidth={2}
                        transparent
                        opacity={0.6}
                    />
                );
            })}
        </>
    );
}

function CityMarker({ city, radius, onSelect }: { city: CityData; radius: number; onSelect: (c: CityData) => void }) {
    const position = useMemo(() => latLongToVector3(city.lat, city.lng, radius), [city, radius]);
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <mesh
                onClick={() => onSelect(city)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[hovered ? 0.04 : 0.025, 16, 16]} />
                <meshBasicMaterial color={hovered ? "#ffffff" : "#888888"} />
            </mesh>
            {/* Pulsing ring */}
            <mesh scale={[1.5, 1.5, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.03, 0.04, 32]} />
                <meshBasicMaterial color="#aaaaaa" opacity={0.4} transparent side={THREE.DoubleSide} />
            </mesh>

            {hovered && (
                <Html distanceFactor={10}>
                    <div className="bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-white/20 backdrop-blur-md shadow-xl">
                        <div className="font-bold">{city.name}</div>
                        <div className="text-gray-400 text-[10px]">{city.country}</div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function RotatingEarthGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const { cities, allCities } = useWorldTime();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    const handleCitySelect = (city: CityData) => {
        console.log("Selected", city.name);
    };

    // Show all cities on globe but limit to prevent performance issues  
    const displayCities = allCities;

    return (
        <group ref={groupRef}>
            {/* Earth Sphere */}
            <mesh scale={[2.5, 2.5, 2.5]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            {/* Continent Outlines */}
            <ContinentLines radius={2.5} />

            {/* Longitude/Latitude Grid */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const points = Array.from({ length: 50 }).map((_, j) => {
                    const lat = (j / 50) * 180 - 90;
                    const lng = (angle * 180) / Math.PI;
                    const vec = latLongToVector3(lat, lng, 2.51);
                    return new THREE.Vector3(vec[0], vec[1], vec[2]);
                });

                return (
                    <Line
                        key={`meridian-${i}`}
                        points={points}
                        color="#222222"
                        lineWidth={0.5}
                        transparent
                        opacity={0.3}
                    />
                );
            })}

            {Array.from({ length: 6 }).map((_, i) => {
                const lat = (i / 6) * 180 - 90;
                const points = Array.from({ length: 72 }).map((_, j) => {
                    const lng = (j / 72) * 360 - 180;
                    const vec = latLongToVector3(lat, lng, 2.51);
                    return new THREE.Vector3(vec[0], vec[1], vec[2]);
                });

                return (
                    <Line
                        key={`parallel-${i}`}
                        points={points}
                        color="#222222"
                        lineWidth={0.5}
                        transparent
                        opacity={0.3}
                    />
                );
            })}

            {/* City Markers */}
            {displayCities.map(city => (
                <CityMarker key={city.id} city={city} radius={2.55} onSelect={handleCitySelect} />
            ))}
        </group>
    )
}

export function Globe() {
    return (
        <div className="w-full h-full min-h-[500px] relative bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <fog attach="fog" args={['#000', 5, 20]} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 3, 5]} intensity={1.2} />
                <directionalLight position={[-3, -2, -3]} intensity={0.3} />

                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />

                <RotatingEarthGroup />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={15}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}
