import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { latLongToVector3 } from '../utils/coordinates';

// Textures from Three.js examples / NASA
const TEXTURES = {
    day: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_day_4096.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
};

function CountryBorders({ radius }: { radius: number }) {
    const [geoJson, setGeoJson] = useState<any>(null);

    useEffect(() => {
        // Fetch simplified world borders GeoJSON
        fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
            .then(res => res.json())
            .then(data => setGeoJson(data))
            .catch(err => console.error("Error loading GeoJSON", err));
    }, []);

    const borderLines = useMemo(() => {
        if (!geoJson) return [];

        const lines: THREE.Vector3[][] = [];
        geoJson.features.forEach((feature: any) => {
            const { type, coordinates } = feature.geometry;
            if (type === 'Polygon') {
                coordinates.forEach((poly: any) => {
                    const points = poly.map(([lng, lat]: [number, number]) =>
                        latLongToVector3(lat, lng, radius + 0.01)
                    );
                    lines.push(points);
                });
            } else if (type === 'MultiPolygon') {
                coordinates.forEach((multi: any) => {
                    multi.forEach((poly: any) => {
                        const points = poly.map(([lng, lat]: [number, number]) =>
                            latLongToVector3(lat, lng, radius + 0.01)
                        );
                        lines.push(points);
                    });
                });
            }
        });
        return lines;
    }, [geoJson, radius]);

    return (
        <group>
            {borderLines.map((points, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints(points)} />
                    <lineBasicMaterial attach="material" color="#ffffff" opacity={0.2} transparent />
                </line>
            ))}
        </group>
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
                <sphereGeometry args={[hovered ? 0.035 : 0.02, 12, 12]} />
                <meshBasicMaterial
                    color={hovered ? "#00f2ff" : "#ffffff"}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Glowing ring for city */}
            <mesh rotation-x={Math.PI / 2}>
                <ringGeometry args={[0.03, 0.04, 32]} />
                <meshBasicMaterial color="#00f2ff" transparent opacity={hovered ? 0.6 : 0.1} />
            </mesh>

            {hovered && (
                <Html distanceFactor={8}>
                    <div className="bg-black/90 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-cyan-500/30 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <div className="font-bold">{city.name}</div>
                        <div className="text-cyan-400 text-[10px] tracking-wider uppercase">{city.country}</div>
                        <div className="text-gray-400 text-[10px] mt-1 font-mono">{city.timezone}</div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function Atmosphere({ radius }: { radius: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[radius * 1.15, 64, 64]} />
            <meshStandardMaterial
                color="#0066ff"
                transparent
                opacity={0.1}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

function RotatingEarth() {
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

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0007;
        }
    });

    return (
        <group>
            <group ref={groupRef}>
                {/* Main Earth Mesh */}
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
                    <meshPhongMaterial
                        map={dayMap}
                        specularMap={specularMap}
                        normalMap={normalMap}
                        normalScale={new THREE.Vector2(0.85, 0.85)}
                        specular={new THREE.Color('grey')}
                        shininess={10}
                    />
                </mesh>

                {/* Clouds Layer */}
                <mesh ref={cloudsRef}>
                    <sphereGeometry args={[EARTH_RADIUS + 0.02, 64, 64]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        transparent
                        opacity={0.4}
                        depthWrite={false}
                    />
                </mesh>

                {/* Country Borders */}
                <CountryBorders radius={EARTH_RADIUS} />

                {/* City Markers */}
                {allCities.map(city => (
                    <CityMarker key={city.id} city={city} radius={EARTH_RADIUS + 0.03} />
                ))}
            </group>

            {/* Atmosphere Glow */}
            <Atmosphere radius={EARTH_RADIUS} />
        </group>
    );
}

export function Globe() {
    return (
        <div className="w-full h-full min-h-[500px] relative bg-black overflow-hidden">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center w-full h-full text-white font-mono gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                    <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 animate-pulse">CONNECTING_TO_CORE...</div>
                </div>
            }>
                <Canvas camera={{ position: [0, 0, 7], fov: 50 }} shadows>
                    <color attach="background" args={['#000000']} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                    <spotLight
                        position={[-10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1}
                        castShadow
                    />

                    <Stars
                        radius={100}
                        depth={60}
                        count={10000}
                        factor={7}
                        saturation={0}
                        fade
                        speed={1}
                    />

                    <RotatingEarth />

                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        minDistance={3.2}
                        maxDistance={15}
                        rotateSpeed={0.5}
                        zoomSpeed={0.6}
                    />
                </Canvas>
            </Suspense>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        </div>
    );
}
