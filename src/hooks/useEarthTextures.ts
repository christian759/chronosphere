import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Using high-quality standard textures (placeholders for URLs that would exist in a real deployed app)
// For this demo, we will use standard THREE.js placeholder textures or reliable CDNs
export function useEarthTextures() {
    const [day, night, clouds, normal] = useLoader(TextureLoader, [
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        'https://unpkg.com/three-globe/example/img/earth-night.jpg',
        'https://unpkg.com/three-globe/example/img/earth-clouds.png',
        'https://unpkg.com/three-globe/example/img/earth-topology.png'
    ]);

    return { day, night, clouds, normal };
}
