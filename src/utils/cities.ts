// Comprehensive world cities database with timezones and coordinates
export interface CityData {
    id: string;
    name: string;
    country: string;
    timezone: string;
    lat: number;
    lng: number;
    population?: number;
    continent: string;
}

export const WORLD_CITIES: CityData[] = [
    // North America
    { id: 'new-york', name: 'New York', country: 'United States', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060, population: 8336817, continent: 'North America' },
    { id: 'los-angeles', name: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', lat: 34.0522, lng: -118.2437, population: 3979576, continent: 'North America' },
    { id: 'chicago', name: 'Chicago', country: 'United States', timezone: 'America/Chicago', lat: 41.8781, lng: -87.6298, population: 2693976, continent: 'North America' },
    { id: 'toronto', name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', lat: 43.6532, lng: -79.3832, population: 2731571, continent: 'North America' },
    { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, population: 8918653, continent: 'North America' },
    { id: 'vancouver', name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', lat: 49.2827, lng: -123.1207, population: 631486, continent: 'North America' },
    { id: 'miami', name: 'Miami', country: 'United States', timezone: 'America/New_York', lat: 25.7617, lng: -80.1918, population: 467963, continent: 'North America' },

    // Europe
    { id: 'london', name: 'London', country: 'United Kingdom', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278, population: 8982000, continent: 'Europe' },
    { id: 'paris', name: 'Paris', country: 'France', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522, population: 2161000, continent: 'Europe' },
    { id: 'berlin', name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', lat: 52.5200, lng: 13.4050, population: 3645000, continent: 'Europe' },
    { id: 'madrid', name: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', lat: 40.4168, lng: -3.7038, population: 3223000, continent: 'Europe' },
    { id: 'rome', name: 'Rome', country: 'Italy', timezone: 'Europe/Rome', lat: 41.9028, lng: 12.4964, population: 2873000, continent: 'Europe' },
    { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', lat: 52.3676, lng: 4.9041, population: 821752, continent: 'Europe' },
    { id: 'moscow', name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', lat: 55.7558, lng: 37.6173, population: 11920000, continent: 'Europe' },
    { id: 'istanbul', name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', lat: 41.0082, lng: 28.9784, population: 15460000, continent: 'Europe' },

    // Asia
    { id: 'tokyo', name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, population: 13960000, continent: 'Asia' },
    { id: 'beijing', name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', lat: 39.9042, lng: 116.4074, population: 21540000, continent: 'Asia' },
    { id: 'shanghai', name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', lat: 31.2304, lng: 121.4737, population: 24280000, continent: 'Asia' },
    { id: 'hong-kong', name: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong', lat: 22.3193, lng: 114.1694, population: 7482000, continent: 'Asia' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', lat: 1.3521, lng: 103.8198, population: 5686000, continent: 'Asia' },
    { id: 'dubai', name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, population: 3331000, continent: 'Asia' },
    { id: 'mumbai', name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', lat: 19.0760, lng: 72.8777, population: 20411000, continent: 'Asia' },
    { id: 'delhi', name: 'Delhi', country: 'India', timezone: 'Asia/Kolkata', lat: 28.7041, lng: 77.1025, population: 16753000, continent: 'Asia' },
    { id: 'bangkok', name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', lat: 13.7563, lng: 100.5018, population: 10539000, continent: 'Asia' },
    { id: 'seoul', name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', lat: 37.5665, lng: 126.9780, population: 9776000, continent: 'Asia' },

    // South America
    { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333, population: 12325000, continent: 'South America' },
    { id: 'rio', name: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -22.9068, lng: -43.1729, population: 6748000, continent: 'South America' },
    { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', lat: -34.6037, lng: -58.3816, population: 3075000, continent: 'South America' },
    { id: 'santiago', name: 'Santiago', country: 'Chile', timezone: 'America/Santiago', lat: -33.4489, lng: -70.6693, population: 6310000, continent: 'South America' },

    // Africa
    { id: 'cairo', name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357, population: 20076000, continent: 'Africa' },
    { id: 'lagos', name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', lat: 6.5244, lng: 3.3792, population: 14368000, continent: 'Africa' },
    { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473, population: 5635000, continent: 'Africa' },
    { id: 'nairobi', name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', lat: -1.2864, lng: 36.8172, population: 4397000, continent: 'Africa' },

    // Oceania
    { id: 'sydney', name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, population: 5312000, continent: 'Oceania' },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', lat: -37.8136, lng: 144.9631, population: 5078000, continent: 'Oceania' },
    { id: 'auckland', name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', lat: -36.8485, lng: 174.7633, population: 1657000, continent: 'Oceania' },
];

// Function to search cities by name
export function searchCities(query: string): CityData[] {
    const lowerQuery = query.toLowerCase();
    return WORLD_CITIES.filter(city =>
        city.name.toLowerCase().includes(lowerQuery) ||
        city.country.toLowerCase().includes(lowerQuery)
    );
}

// Function to get city by ID
export function getCityById(id: string): CityData | undefined {
    return WORLD_CITIES.find(city => city.id === id);
}
