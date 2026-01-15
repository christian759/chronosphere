import { useState, useEffect } from 'react';
import { WORLD_CITIES, searchCities, getCityById, type CityData } from '../utils/cities';

const FAVORITES_STORAGE_KEY = 'chronosphere-favorites';
const TIME_FORMAT_KEY = 'chronosphere-time-format';

export type { CityData };

export function useWorldTime() {
    const [time, setTime] = useState(new Date());
    const [is12Hour, setIs12Hour] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(TIME_FORMAT_KEY);
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });

    const [favoriteCityIds, setFavoriteCityIds] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse favorites from localStorage', e);
                    return ['new-york', 'london', 'tokyo'];
                }
            }
        }
        // Default favorites
        return ['new-york', 'london', 'tokyo'];
    });

    useEffect(() => {
        // Update every second
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Save favorites and format
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteCityIds));
        localStorage.setItem(TIME_FORMAT_KEY, JSON.stringify(is12Hour));
    }, [favoriteCityIds, is12Hour]);

    const getCityTime = (timezone: string) => {
        return new Date(time.toLocaleString('en-US', { timeZone: timezone }));
    };

    const getFormattedTime = (timezone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: is12Hour
        }).format(time);
    };

    const getFormattedDate = (timezone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(time);
    };

    const addFavorite = (cityId: string) => {
        if (!favoriteCityIds.includes(cityId)) {
            setFavoriteCityIds([...favoriteCityIds, cityId]);
        }
    };

    const removeFavorite = (cityId: string) => {
        setFavoriteCityIds(favoriteCityIds.filter(id => id !== cityId));
    };

    const isFavorite = (cityId: string) => {
        return favoriteCityIds.includes(cityId);
    };

    const toggleTimeFormat = () => setIs12Hour(!is12Hour);

    const favoriteCities = favoriteCityIds
        .map(id => getCityById(id))
        .filter((city): city is CityData => city !== undefined);

    return {
        utc: time,
        getCityTime,
        getFormattedTime,
        getFormattedDate,
        cities: favoriteCities,
        allCities: WORLD_CITIES,
        searchCities,
        addFavorite,
        removeFavorite,
        isFavorite,
        is12Hour,
        toggleTimeFormat
    };
}
