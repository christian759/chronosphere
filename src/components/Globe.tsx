import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { useTheme } from '../hooks/useTheme';
import { latLongToVector3 } from '../utils/coordinates';

// Reliable 2K textures
const TEXTURES = {
    day: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
};

import worldBorders from '../assets/world-borders.json';

function CountryBorders({ radius, isDark }: { radius: number; isDark: boolean }) {
    const borderGeometry = useMemo(() => {
        const positions: number[] = [];

        worldBorders.features.forEach((feature: any) => {
            const { type, coordinates } = feature.geometry;
            const processPolygon = (poly: any) => {
                for (let i = 0; i < poly.length - 1; i++) {
                    const p1 = latLongToVector3(poly[i][1], poly[i][0], radius + 0.01);
                    const p2 = latLongToVector3(poly[i + 1][1], poly[i + 1][0], radius + 0.01);
                    positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                }
            };

            if (type === 'Polygon') {
                coordinates.forEach(processPolygon);
            } else if (type === 'MultiPolygon') {
                coordinates.forEach((multi: any) => multi.forEach(processPolygon));
            }
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geometry;
    }, [radius]);

    return (
        <lineSegments geometry={borderGeometry}>
            <lineBasicMaterial color={isDark ? "#ffffff" : "#000000"} opacity={isDark ? 0.1 : 0.2} transparent />
        </lineSegments>
    );
}

function CityMarker({ city, radius, isDark }: { city: CityData; radius: number; isDark: boolean }) {
    const position = useMemo(() => latLongToVector3(city.lat, city.lng, radius), [city, radius]);
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[hovered ? 0.03 : 0.02, 12, 12]} />
                <meshBasicMaterial
                    color={hovered ? "#00f2ff" : (isDark ? "#ffffff" : "#64748b")}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            <mesh rotation-x={Math.PI / 2}>
                <ringGeometry args={[0.025, 0.035, 32]} />
                <meshBasicMaterial color="#00f2ff" transparent opacity={hovered ? 0.6 : 0.1} />
            </mesh>

            {hovered && (
                <Html distanceFactor={8}>
                    <div className="bg-white dark:bg-black/95 backdrop-blur-md text-gray-900 dark:text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-gray-200 dark:border-white/20 shadow-xl">
                        <div className="font-bold tracking-tight">{city.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-[10px] tracking-wider uppercase">{city.country}</div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function Atmosphere({ radius, isDark }: { radius: number; isDark: boolean }) {
    return (
        <mesh>
            <sphereGeometry args={[radius * 1.05, 32, 32]} />
            <meshStandardMaterial
                color={isDark ? "#4facfe" : "#7dd3fc"}
                transparent
                opacity={isDark ? 0.15 : 0.25}
                side={THREE.BackSide}
                blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
        </mesh>
    );
}

function RotatingEarth({ targetCityId, isDark }: { targetCityId?: string | null; isDark: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const { allCities } = useWorldTime();
    const EARTH_RADIUS = 2.5;

    const [dayMap, specularMap, normalMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        TEXTURES.day,
        TEXTURES.specular,
        TEXTURES.normal,
        TEXTURES.clouds,
    ]);

    // Smooth transition state
    const targetRotation = useRef<{ y: number; x: number } | null>(null);

    const targetCity = useMemo(() =>
        targetCityId ? allCities.find(c => c.id === targetCityId) : null
        , [allCities, targetCityId]);

    useEffect(() => {
        if (targetCity) {
            const theta = (targetCity.lng + 180) * (Math.PI / 180);
            const phi = (90 - targetCity.lat) * (Math.PI / 180);

            targetRotation.current = {
                y: Math.PI / 2 - theta,
                x: phi - Math.PI / 2
            };
        } else {
            targetRotation.current = null;
        }
    }, [targetCity]);

    useFrame(() => {
        if (!groupRef.current) return;

        if (targetRotation.current) {
            groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.15;
            groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.15;
        } else {
            groupRef.current.rotation.y += 0.0005;
            groupRef.current.rotation.x *= 0.95;
        }

        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0007;
        }
    });

    return (
        <group>
            <group ref={groupRef}>
                <mesh receiveShadow>
                    <sphereGeometry args={[EARTH_RADIUS, 48, 48]} />
                    <meshPhongMaterial
                        map={dayMap}
                        specularMap={specularMap}
                        normalMap={normalMap}
                        normalScale={new THREE.Vector2(0.85, 0.85)}
                        specular={new THREE.Color(isDark ? 'grey' : '#white')}
                        shininess={isDark ? 5 : 10}
                    />
                </mesh>

                <mesh ref={cloudsRef}>
                    <sphereGeometry args={[EARTH_RADIUS + 0.02, 48, 48]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        transparent
                        opacity={isDark ? 0.3 : 0.4}
                        depthWrite={false}
                    />
                </mesh>

                <CountryBorders radius={EARTH_RADIUS} isDark={isDark} />

                {allCities.map(city => (
                    <CityMarker key={city.id} city={city} radius={EARTH_RADIUS + 0.03} isDark={isDark} />
                ))}
            </group>

            <Atmosphere radius={EARTH_RADIUS} isDark={isDark} />
        </group>
    );
}

export interface GlobeProps {
    targetCityId?: string | null;
}

export function Globe({ targetCityId }: GlobeProps) {
    const { isDark } = useTheme();

    return (
        <div className={`w-full h-full min-h-[500px] relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center w-full h-full text-slate-800 dark:text-white font-mono gap-4">
                    <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                    <div className="text-[10px] tracking-widest uppercase opacity-50">Syncing...</div>
                </div>
            }>
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <color attach="background" args={[isDark ? '#000000' : '#f8fafc']} />
                    <ambientLight intensity={isDark ? 0.6 : 0.8} />
                    <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 2.0} />
                    {isDark && <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />}
                    <RotatingEarth targetCityId={targetCityId} isDark={isDark} />
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minDistance={3.2}
                        maxDistance={12}
                        rotateSpeed={0.5}
                        zoomSpeed={0.6}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}
