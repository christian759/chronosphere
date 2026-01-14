import * as THREE from 'three';

export function getSunPosition(date: Date = new Date()): THREE.Vector3 {
    // Approximate calculation of sun position
    // In a real app we might use 'suncalc' library, but a simplified model works for visuals

    const now = date.getTime();
    // Day of year approximate
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = now - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // UTC hours for rotation
    const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60;

    // Earth rotates 15 degrees per hour
    // Sun "moves" opposite to Earth's rotation (East to West relative to surface)
    // At UTC 12:00, Sun is near Greenwhich (0 longitude)
    // Actually, simpler model:
    // Convert time to angle.
    // 12:00 UTC = Sun at 0,0,1 (roughly, facing Z)

    // Let's use spherical coordinates
    // Phi (latitude angle): varies by season (+- 23.5 deg)
    const seasonOffsetScale = 23.4 * (Math.PI / 180);
    const phi = Math.sin((dayOfYear / 365) * 2 * Math.PI) * seasonOffsetScale;

    // Theta (longitude angle): -PI to PI
    // 12:00 UTC = 0 degrees longitude (roughly)
    // 00:00 UTC = 180 degrees longitude
    const theta = ((utcHours - 12) / 24) * 2 * Math.PI; // -PI to PI

    // Convert to Cartesian
    // In Three.js: Y is Up. 
    // We assume textures are mapped with Lat/Long where standard UV mapping applies.
    // Standard sphere UV: U=0.5 is 0 longitude? usually 0..1 wraps 360.

    // Let's place the sun far away
    const r = 10;
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(phi);
    const z = r * Math.cos(theta) * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
}
