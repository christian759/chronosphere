import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { latLongToVector3 } from '../utils/coordinates';

// Optimized Textures (2K for performance)
const TEXTURES = {
    day: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
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
                    <lineBasicMaterial attach="material" color="#ffffff" opacity={0.15} transparent />
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
                <sphereGeometry args={[hovered ? 0.03 : 0.02, 12, 12]} />
                <meshBasicMaterial
                    color={hovered ? "#00f2ff" : "#ffffff"}
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
                    <div className="bg-black/95 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="font-bold tracking-tight">{city.name}</div>
                        <div className="text-gray-400 text-[10px] tracking-wider uppercase">{city.country}</div>
                    </div>
                </Html>
            )}
        </group>
    );
}

function Atmosphere({ radius }: { radius: number }) {
    return (
        <mesh>
            <sphereGeometry args={[radius * 1.05, 32, 32]} />
            <meshStandardMaterial
                color="#4facfe"
                transparent
                opacity={0.15}
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
        if (groupRef.current) groupRef.current.rotation.y += 0.0005;
        if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0007;
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
                        specular={new THREE.Color('grey')}
                        shininess={5}
                    />
                </mesh>

                <mesh ref={cloudsRef}>
                    <sphereGeometry args={[EARTH_RADIUS + 0.02, 48, 48]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        transparent
                        opacity={0.3}
                        depthWrite={false}
                    />
                </mesh>

                <CountryBorders radius={EARTH_RADIUS} />

                {allCities.map(city => (
                    <CityMarker key={city.id} city={city} radius={EARTH_RADIUS + 0.03} />
                ))}
            </group>

            <Atmosphere radius={EARTH_RADIUS} />
        </group>
    );
}

export function Globe() {
    return (
        <div className="w-full h-full min-h-[500px] relative bg-black overflow-hidden">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center w-full h-full text-white font-mono gap-4">
                    <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                    <div className="text-[10px] tracking-widest uppercase opacity-50">Syncing...</div>
                </div>
            }>
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
                    <RotatingEarth />
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
