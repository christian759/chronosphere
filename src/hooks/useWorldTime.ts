import { useState, useEffect } from 'react';

export type CityKey = 'GMT' | 'NYC' | 'LON' | 'TYO' | 'SYD' | 'PAR' | 'DUB';

export interface CityData {
    id: string;
    name: string;
    timezone: string;
    lat: number;
    lng: number;
}

const CITIES: Record<string, CityData> = {
    'NYC': { id: 'New York', name: 'New York', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060 },
    'LON': { id: 'London', name: 'London', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278 },
    'TYO': { id: 'Tokyo', name: 'Tokyo', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503 },
    'SYD': { id: 'Sydney', name: 'Sydney', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093 },
    'PAR': { id: 'Paris', name: 'Paris', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522 },
    'DUB': { id: 'Dubai', name: 'Dubai', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708 },
};

export function useWorldTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update every second
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getCityTime = (timezone: string) => {
        // In date-fns v4 / modern JS, we use Intl or the new API
        // but here we just use native Date with locale for simplicity if date-fns-tz is tricky to setup instantly
        // Actually I installed date-fns, but not date-fns-tz.
        // I should probably just use native Intl.DateTimeFormat for safety if I didn't install date-fns-tz
        // Let's stick to Intl for zero-dep reliability on timezones if possible, OR just fake it for now.
        // But user asked for "Complete advanced".
        // I'll use Intl.

        return new Date(time.toLocaleString('en-US', { timeZone: timezone }));
    };

    const getFormattedTime = (timezone: string) => {
        // Just a placeholder wrapper
        // use simple formatting or date-fns format if available. 
        // I'll implement a simple one for now or use date-fns if imported.
        // Since I installed date-fns, I can use it.
        // But wait I didn't install date-fns-tz. formatting a date object that is already shifted might be wrong if it keeps local offset.
        // Better:

        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(time);
    };

    return {
        utc: time,
        getCityTime,
        getFormattedTime,
        cities: Object.values(CITIES)
    };
}
