import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { latLongToVector3 } from '../utils/coordinates';

// Detailed continent outlines
const CONTINENTS = {
    northAmerica: [
        [-170, 70], [-140, 70], [-130, 60], [-125, 50], [-122, 48],
        [-115, 50], [-95, 50], [-82, 50], [-75, 45], [-70, 47],
        [-65, 50], [-60, 55], [-55, 60], [-60, 70], [-90, 75],
        [-120, 75], [-150, 72], [-170, 70]
    ],
    southAmerica: [
        [-80, 12], [-75, 5], [-70, -5], [-60, -15], [-55, -25],
        [-50, -35], [-55, -50], [-65, -55], [-72, -50], [-75, -35],
        [-78, -15], [-80, 5], [-80, 12]
    ],
    europe: [
        [-10, 55], [0, 60], [10, 60], [20, 55], [30, 60], [40, 70],
        [60, 70], [65, 60], [60, 50], [50, 45], [40, 40], [30, 38],
        [20, 40], [10, 43], [0, 48], [-10, 55]
    ],
    africa: [
        [-18, 35], [0, 37], [20, 32], [35, 30], [42, 20], [45, 5],
        [42, -10], [35, -25], [28, -34], [18, -35], [12, -25],
        [10, -10], [15, 10], [18, 20], [10, 30], [-5, 35], [-18, 35]
    ],
    asia: [
        [30, 45], [40, 50], [50, 55], [60, 65], [70, 75], [90, 78],
        [110, 75], [130, 70], [145, 60], [155, 45], [160, 30],
        [155, 20], [145, 15], [130, 10], [115, 5], [100, -5],
        [90, -10], [80, -5], [70, 10], [60, 25], [50, 35],
        [40, 40], [30, 45]
    ],
    australia: [
        [113, -10], [125, -12], [135, -12], [145, -15], [150, -25],
        [153, -35], [148, -39], [140, -38], [130, -32], [118, -20],
        [113, -10]
    ]
};

function ContinentLines({ radius }: { radius: number }) {
    return (
        <>
            {Object.entries(CONTINENTS).map(([name, points]) => {
                const vertices = points.map(([lng, lat]) => {
                    const vec = latLongToVector3(lat, lng, radius + 0.01);
                    return new THREE.Vector3(vec[0], vec[1], vec[2]);
                });

                return (
                    <line key={name}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={vertices.length}
                                array={new Float32Array(vertices.flatMap(v => [v.x, v.y, v.z]))}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#4a7c2e" linewidth={2} />
                    </line>
                );
            })}
        </>
    );
}

function GridLines({ radius }: { radius: number }) {
    return (
        <>
            {/* Latitude lines */}
            {[-60, -30, 0, 30, 60].map((lat) => {
                const points = Array.from({ length: 73 }).map((_, i) => {
                    const lng = i * 5 - 180;
                    const vec = latLongToVector3(lat, lng, radius + 0.002);
                    return new THREE.Vector3(vec[0], vec[1], vec[2]);
                });

                return (
                    <line key={`lat-${lat}`}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={points.length}
                                array={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#444444" opacity={0.3} transparent />
                    </line>
                );
            })}

            {/* Longitude lines */}
            {Array.from({ length: 12 }).map((_, i) => {
                const lng = i * 30 - 180;
                const points = Array.from({ length: 37 }).map((_, j) => {
                    const lat = j * 5 - 90;
                    const vec = latLongToVector3(lat, lng, radius + 0.002);
                    return new THREE.Vector3(vec[0], vec[1], vec[2]);
                });

                return (
                    <line key={`lng-${lng}`}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={points.length}
                                array={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#444444" opacity={0.3} transparent />
                    </line>
                );
            })}
        </>
    );
}

function CityMarker({ city, radius }: { city: CityData; radius: number }) {
    const position = useMemo(() => latLongToVector3(city.lat, city.lng, radius), [city, radius]);
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[hovered ? 0.035 : 0.025, 12, 12]} />
                <meshBasicMaterial color={hovered ? "#ff6b6b" : "#ffa500"} />
            </mesh>

            {hovered && (
                <Html distanceFactor={8}>
                    <div className="bg-black/95 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-white/30">
                        <div className="font-bold">{city.name}</div>
                        <div className="text-gray-400 text-[10px]">{city.country}</div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function RotatingEarth() {
    const groupRef = useRef<THREE.Group>(null);
    const { allCities } = useWorldTime();
    const EARTH_RADIUS = 2.5;

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Ocean Sphere */}
            <mesh>
                <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
                <meshStandardMaterial
                    color="#0d1b2a"
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>

            {/* Continent Outlines */}
            <ContinentLines radius={EARTH_RADIUS} />

            {/* Grid Lines */}
            <GridLines radius={EARTH_RADIUS} />

            {/* City Markers */}
            {allCities.map(city => (
                <CityMarker key={city.id} city={city} radius={EARTH_RADIUS + 0.03} />
            ))}
        </group>
    );
}

export function Globe() {
    return (
        <div className="w-full h-full min-h-[500px] relative bg-black">
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 10, 25]} />

                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, -3, -5]} intensity={0.3} />

                <Stars radius={100} depth={60} count={5000} factor={4} saturation={0} fade speed={0.5} />

                <RotatingEarth />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={3.5}
                    maxDistance={12}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}
