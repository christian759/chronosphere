import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useWorldTime, type CityData } from '../hooks/useWorldTime';
import { latLongToVector3 } from '../utils/coordinates';

// Custom Shader Material remains the same...
const EarthMaterial = {
    uniforms: {
        sunPosition: { value: new THREE.Vector3(0, 0, 10) },
        dayTexture: { value: null },
        nightTexture: { value: null },
        cloudTexture: { value: null },
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 sunPosition;
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D cloudTexture;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 sunDir = normalize(sunPosition);
      float intensity = dot(vNormal, sunDir);
      float mixFactor = smoothstep(-0.2, 0.2, intensity);
      
      vec4 dayColor = texture2D(dayTexture, vUv);
      vec4 nightColor = texture2D(nightTexture, vUv);
      vec4 clouds = texture2D(cloudTexture, vUv);

      vec3 finalColor = mix(nightColor.rgb, dayColor.rgb, mixFactor);
      finalColor = mix(finalColor, vec3(1.0), clouds.r * 0.4);
      
      if (mixFactor < 0.5) {
          finalColor = mix(finalColor, vec3(0.0), clouds.r * 0.8 * (1.0 - mixFactor)); 
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

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
                <sphereGeometry args={[hovered ? 0.05 : 0.03, 16, 16]} />
                <meshBasicMaterial color={hovered ? "#ffffff" : "#666666"} />
            </mesh>
            {/* Pulsing ring */}
            <mesh scale={[1.5, 1.5, 1.5]}>
                <ringGeometry args={[0.04, 0.05, 32]} />
                <meshBasicMaterial color="#999999" opacity={0.5} transparent side={THREE.DoubleSide} />
            </mesh>

            {hovered && (
                <Html distanceFactor={10}>
                    <div className="bg-black/80 text-white p-2 rounded text-xs whitespace-nowrap border border-white/20 backdrop-blur-md">
                        {city.name}
                    </div>
                </Html>
            )}
        </group>
    );
}


function RotatingEarthGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const { cities } = useWorldTime();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
    });

    const handleCitySelect = (city: CityData) => {
        console.log("Selected", city.name);
        // Implement FlyTo logic here later
    };

    return (
        <group ref={groupRef}>
            <mesh scale={[2.5, 2.5, 2.5]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>
            {cities.map(city => (
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
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 3, 5]} intensity={1} />

                <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />

                <RotatingEarthGroup />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={20}
                />
            </Canvas>
        </div>
    );
}
