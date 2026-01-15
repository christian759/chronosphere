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
    { id: 'toronto', name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', lat: 43.6532, lng: -79.3832, population: 2731571, continent: 'North America' },
    { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, population: 8918653, continent: 'North America' },
    { id: 'havana', name: 'Havana', country: 'Cuba', timezone: 'America/Havana', lat: 23.1136, lng: -82.3666, continent: 'North America' },
    { id: 'guatemala-city', name: 'Guatemala City', country: 'Guatemala', timezone: 'America/Guatemala', lat: 14.6133, lng: -90.5353, continent: 'North America' },
    { id: 'panama-city', name: 'Panama City', country: 'Panama', timezone: 'America/Panama', lat: 8.9833, lng: -79.5167, continent: 'North America' },
    { id: 'san-jose-cr', name: 'San José', country: 'Costa Rica', timezone: 'America/Costa_Rica', lat: 9.9281, lng: -84.0907, continent: 'North America' },
    { id: 'ottawa', name: 'Ottawa', country: 'Canada', timezone: 'America/Toronto', lat: 45.4215, lng: -75.6972, continent: 'North America' },
    { id: 'vancouver', name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', lat: 49.2827, lng: -123.1207, continent: 'North America' },
    { id: 'chicago', name: 'Chicago', country: 'United States', timezone: 'America/Chicago', lat: 41.8781, lng: -87.6298, continent: 'North America' },
    { id: 'miami', name: 'Miami', country: 'United States', timezone: 'America/New_York', lat: 25.7617, lng: -80.1918, continent: 'North America' },
    { id: 'washington', name: 'Washington D.C.', country: 'United States', timezone: 'America/New_York', lat: 38.9072, lng: -77.0369, continent: 'North America' },
    { id: 'kingston', name: 'Kingston', country: 'Jamaica', timezone: 'America/Jamaica', lat: 17.9714, lng: -76.7936, continent: 'North America' },

    // South America
    { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333, population: 12325000, continent: 'South America' },
    { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', lat: -34.6037, lng: -58.3816, population: 3075000, continent: 'South America' },
    { id: 'bogota', name: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota', lat: 4.7110, lng: -74.0721, continent: 'South America' },
    { id: 'lima', name: 'Lima', country: 'Peru', timezone: 'America/Lima', lat: -12.0464, lng: -77.0428, continent: 'South America' },
    { id: 'santiago', name: 'Santiago', country: 'Chile', timezone: 'America/Santiago', lat: -33.4489, lng: -70.6693, continent: 'South America' },
    { id: 'caracas', name: 'Caracas', country: 'Venezuela', timezone: 'America/Caracas', lat: 10.4806, lng: -66.9036, continent: 'South America' },
    { id: 'quito', name: 'Quito', country: 'Ecuador', timezone: 'America/Quito', lat: -0.1807, lng: -78.4678, continent: 'South America' },
    { id: 'montevideo', name: 'Montevideo', country: 'Uruguay', timezone: 'America/Montevideo', lat: -34.9011, lng: -56.1645, continent: 'South America' },
    { id: 'asuncion', name: 'Asunción', country: 'Paraguay', timezone: 'America/Asuncion', lat: -25.2637, lng: -57.5759, continent: 'South America' },
    { id: 'la-paz', name: 'La Paz', country: 'Bolivia', timezone: 'America/La_Paz', lat: -16.4897, lng: -68.1193, continent: 'South America' },
    { id: 'brasilia', name: 'Brasília', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -15.7801, lng: -47.9292, continent: 'South America' },
    { id: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -22.9068, lng: -43.1729, continent: 'South America' },
    { id: 'georgetown-gy', name: 'Georgetown', country: 'Guyana', timezone: 'America/Guyana', lat: 6.8013, lng: -58.1551, continent: 'South America' },
    { id: 'paramaribo', name: 'Paramaribo', country: 'Suriname', timezone: 'America/Paramaribo', lat: 5.8520, lng: -55.2038, continent: 'South America' },

    // Europe
    { id: 'london', name: 'London', country: 'United Kingdom', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278, population: 8982000, continent: 'Europe' },
    { id: 'paris', name: 'Paris', country: 'France', timezone: 'Europe/Paris', lat: 48.8566, lng: 2.3522, population: 2161000, continent: 'Europe' },
    { id: 'berlin', name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', lat: 52.5200, lng: 13.4050, population: 3645000, continent: 'Europe' },
    { id: 'madrid', name: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', lat: 40.4168, lng: -3.7038, population: 3223000, continent: 'Europe' },
    { id: 'rome', name: 'Rome', country: 'Italy', timezone: 'Europe/Rome', lat: 41.9028, lng: 12.4964, population: 2873000, continent: 'Europe' },
    { id: 'vienna', name: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', lat: 48.2082, lng: 16.3738, continent: 'Europe' },
    { id: 'lisbon', name: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', lat: 38.7223, lng: -9.1393, continent: 'Europe' },
    { id: 'warsaw', name: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw', lat: 52.2297, lng: 21.0122, continent: 'Europe' },
    { id: 'brussels', name: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels', lat: 50.8503, lng: 4.3517, continent: 'Europe' },
    { id: 'athens', name: 'Athens', country: 'Greece', timezone: 'Europe/Athens', lat: 37.9838, lng: 23.7275, continent: 'Europe' },
    { id: 'stockholm', name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', lat: 59.3293, lng: 18.0686, continent: 'Europe' },
    { id: 'oslo', name: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo', lat: 59.9139, lng: 10.7522, continent: 'Europe' },
    { id: 'helsinki', name: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki', lat: 60.1699, lng: 24.9384, continent: 'Europe' },
    { id: 'copenhagen', name: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen', lat: 55.6761, lng: 12.5683, continent: 'Europe' },
    { id: 'dublin', name: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin', lat: 53.3498, lng: -6.2603, continent: 'Europe' },
    { id: 'geneva', name: 'Geneva', country: 'Switzerland', timezone: 'Europe/Zurich', lat: 46.2044, lng: 6.1432, continent: 'Europe' },
    { id: 'moscow', name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', lat: 55.7558, lng: 37.6173, continent: 'Europe' },
    { id: 'kiev', name: 'Kyiv', country: 'Ukraine', timezone: 'Europe/Kyiv', lat: 50.4501, lng: 30.5234, continent: 'Europe' },
    { id: 'budapest', name: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest', lat: 47.4979, lng: 19.0402, continent: 'Europe' },
    { id: 'prague', name: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague', lat: 50.0755, lng: 14.4378, continent: 'Europe' },
    { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', lat: 52.3676, lng: 4.9041, continent: 'Europe' },
    { id: 'zurich', name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', lat: 47.3769, lng: 8.5417, continent: 'Europe' },
    { id: 'istanbul', name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', lat: 41.0082, lng: 28.9784, continent: 'Europe' },
    { id: 'bucharest', name: 'Bucharest', country: 'Romania', timezone: 'Europe/Bucharest', lat: 44.4268, lng: 26.1025, continent: 'Europe' },
    { id: 'prague-cz', name: 'Prague', country: 'Czechia', timezone: 'Europe/Prague', lat: 50.0755, lng: 14.4378, continent: 'Europe' },

    // Asia
    { id: 'tokyo', name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503, population: 13960000, continent: 'Asia' },
    { id: 'beijing', name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', lat: 39.9042, lng: 116.4074, population: 21540000, continent: 'Asia' },
    { id: 'shanghai', name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', lat: 31.2304, lng: 121.4737, population: 24280000, continent: 'Asia' },
    { id: 'seoul', name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', lat: 37.5665, lng: 126.9780, continent: 'Asia' },
    { id: 'bangkok', name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', lat: 13.7563, lng: 100.5018, continent: 'Asia' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', lat: 1.3521, lng: 103.8198, continent: 'Asia' },
    { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', lat: -6.2088, lng: 106.8456, continent: 'Asia' },
    { id: 'manila', name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', lat: 14.5995, lng: 120.9842, continent: 'Asia' },
    { id: 'mumbai', name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', lat: 19.0760, lng: 72.8777, continent: 'Asia' },
    { id: 'new-delhi', name: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata', lat: 28.6139, lng: 77.2090, continent: 'Asia' },
    { id: 'karachi', name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', lat: 24.8607, lng: 67.0011, continent: 'Asia' },
    { id: 'dhaka', name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', lat: 23.8103, lng: 90.4125, continent: 'Asia' },
    { id: 'tehran', name: 'Tehran', country: 'Iran', timezone: 'Asia/Tehran', lat: 35.6892, lng: 51.3890, continent: 'Asia' },
    { id: 'dubai', name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', lat: 25.2048, lng: 55.2708, continent: 'Asia' },
    { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', lat: 24.7136, lng: 46.6753, continent: 'Asia' },
    { id: 'tel-aviv', name: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Tel_Aviv', lat: 32.0853, lng: 34.7818, continent: 'Asia' },
    { id: 'hanoi', name: 'Hanoi', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', lat: 21.0285, lng: 105.8542, continent: 'Asia' },
    { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', lat: 3.1390, lng: 101.6869, continent: 'Asia' },
    { id: 'hong-kong', name: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong', lat: 22.3193, lng: 114.1694, continent: 'Asia' },
    { id: 'taipei', name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', lat: 25.0330, lng: 121.5654, continent: 'Asia' },
    { id: 'baghdad', name: 'Baghdad', country: 'Iraq', timezone: 'Asia/Baghdad', lat: 33.3152, lng: 44.3661, continent: 'Asia' },
    { id: 'tashkent', name: 'Tashkent', country: 'Uzbekistan', timezone: 'Asia/Tashkent', lat: 41.2995, lng: 69.2401, continent: 'Asia' },
    { id: 'astana', name: 'Astana', country: 'Kazakhstan', timezone: 'Asia/Almaty', lat: 51.1605, lng: 71.4704, continent: 'Asia' },
    { id: 'kathmandu', name: 'Kathmandu', country: 'Nepal', timezone: 'Asia/Kathmandu', lat: 27.7172, lng: 85.3240, continent: 'Asia' },
    { id: 'colombo', name: 'Colombo', country: 'Sri Lanka', timezone: 'Asia/Colombo', lat: 6.9271, lng: 79.8612, continent: 'Asia' },

    // Africa
    { id: 'cairo', name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357, continent: 'Africa' },
    { id: 'lagos', name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', lat: 6.5244, lng: 3.3792, continent: 'Africa' },
    { id: 'johannesburg', name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', lat: -26.2041, lng: 28.0473, continent: 'Africa' },
    { id: 'nairobi', name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', lat: -1.2864, lng: 36.8172, continent: 'Africa' },
    { id: 'addis-ababa', name: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa', lat: 9.0333, lng: 38.7500, continent: 'Africa' },
    { id: 'casablanca', name: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', lat: 33.5731, lng: -7.5898, continent: 'Africa' },
    { id: 'algiers', name: 'Algiers', country: 'Algeria', timezone: 'Africa/Algiers', lat: 36.7538, lng: 3.0588, continent: 'Africa' },
    { id: 'accra', name: 'Accra', country: 'Ghana', timezone: 'Africa/Accra', lat: 5.6037, lng: -0.1870, continent: 'Africa' },
    { id: 'dakar', name: 'Dakar', country: 'Senegal', timezone: 'Africa/Dakar', lat: 14.7167, lng: -17.4677, continent: 'Africa' },
    { id: 'dar-es-salaam', name: 'Dar es Salaam', country: 'Tanzania', timezone: 'Africa/Dar_es_Salaam', lat: -6.7924, lng: 39.2083, continent: 'Africa' },
    { id: 'luanda', name: 'Luanda', country: 'Angola', timezone: 'Africa/Luanda', lat: -8.8390, lng: 13.2343, continent: 'Africa' },
    { id: 'khartoum', name: 'Khartoum', country: 'Sudan', timezone: 'Africa/Khartoum', lat: 15.5007, lng: 32.5599, continent: 'Africa' },
    { id: 'abidjan', name: 'Abidjan', country: "Côte d'Ivoire", timezone: 'Africa/Abidjan', lat: 5.3600, lng: -4.0083, continent: 'Africa' },
    { id: 'kampala', name: 'Kampala', country: 'Uganda', timezone: 'Africa/Kampala', lat: 0.3476, lng: 32.5825, continent: 'Africa' },
    { id: 'tunis', name: 'Tunis', country: 'Tunisia', timezone: 'Africa/Tunis', lat: 36.8065, lng: 10.1815, continent: 'Africa' },
    { id: 'antananarivo', name: 'Antananarivo', country: 'Madagascar', timezone: 'Indian/Antananarivo', lat: -18.8792, lng: 47.5079, continent: 'Africa' },
    { id: 'kinshasa', name: 'Kinshasa', country: 'DR Congo', timezone: 'Africa/Kinshasa', lat: -4.4419, lng: 15.2663, continent: 'Africa' },
    { id: 'porto-novo', name: 'Porto-Novo', country: 'Benin', timezone: 'Africa/Porto-Novo', lat: 6.4965, lng: 2.6036, continent: 'Africa' },
    { id: 'gaborone', name: 'Gaborone', country: 'Botswana', timezone: 'Africa/Gaborone', lat: -24.7623, lng: 25.7995, continent: 'Africa' },
    { id: 'ouagadougou', name: 'Ouagadougou', country: 'Burkina Faso', timezone: 'Africa/Ouagadougou', lat: 12.3657, lng: -1.5339, continent: 'Africa' },
    { id: 'gitega', name: 'Gitega', country: 'Burundi', timezone: 'Africa/Bujumbura', lat: -3.4264, lng: 29.9308, continent: 'Africa' },
    { id: 'praia', name: 'Praia', country: 'Cabo Verde', timezone: 'Atlantic/Cape_Verde', lat: 14.9331, lng: -23.5133, continent: 'Africa' },
    { id: 'yaounde', name: 'Yaoundé', country: 'Cameroon', timezone: 'Africa/Douala', lat: 3.8667, lng: 11.5167, continent: 'Africa' },
    { id: 'bangui', name: 'Bangui', country: 'Central African Republic', timezone: 'Africa/Bangui', lat: 4.3947, lng: 18.5582, continent: 'Africa' },
    { id: 'ndjamena', name: 'N\'Djamena', country: 'Chad', timezone: 'Africa/Ndjamena', lat: 12.1348, lng: 15.0557, continent: 'Africa' },
    { id: 'moroni', name: 'Moroni', country: 'Comoros', timezone: 'Africa/Comoro', lat: -11.7022, lng: 43.2551, continent: 'Africa' },
    { id: 'brazzaville', name: 'Brazzaville', country: 'Republic of the Congo', timezone: 'Africa/Brazzaville', lat: -4.2661, lng: 15.2832, continent: 'Africa' },
    { id: 'djibouti-city', name: 'Djibouti City', country: 'Djibouti', timezone: 'Africa/Djibouti', lat: 11.5721, lng: 43.1456, continent: 'Africa' },
    { id: 'malabo', name: 'Malabo', country: 'Equatorial Guinea', timezone: 'Africa/Malabo', lat: 3.7558, lng: 8.7817, continent: 'Africa' },
    { id: 'asmara', name: 'Asmara', country: 'Eritrea', timezone: 'Africa/Asmera', lat: 15.3381, lng: 38.9318, continent: 'Africa' },
    { id: 'mbabane', name: 'Mbabane', country: 'Eswatini', timezone: 'Africa/Mbabane', lat: -26.3167, lng: 31.1333, continent: 'Africa' },
    { id: 'libreville', name: 'Libreville', country: 'Gabon', timezone: 'Africa/Libreville', lat: 0.3924, lng: 9.4536, continent: 'Africa' },
    { id: 'banjul', name: 'Banjul', country: 'Gambia', timezone: 'Africa/Banjul', lat: 13.4549, lng: -16.5790, continent: 'Africa' },
    { id: 'conakry', name: 'Conakry', country: 'Guinea', timezone: 'Africa/Conakry', lat: 9.6412, lng: -13.5784, continent: 'Africa' },
    { id: 'bissau', name: 'Bissau', country: 'Guinea-Bissau', timezone: 'Africa/Bissau', lat: 11.7723, lng: -15.1696, continent: 'Africa' },
    { id: 'maseru', name: 'Maseru', country: 'Lesotho', timezone: 'Africa/Maseru', lat: -29.3167, lng: 27.4833, continent: 'Africa' },
    { id: 'monrovia', name: 'Monrovia', country: 'Liberia', timezone: 'Africa/Monrovia', lat: 6.3005, lng: -10.7969, continent: 'Africa' },
    { id: 'tripoli', name: 'Tripoli', country: 'Libya', timezone: 'Africa/Tripoli', lat: 32.8874, lng: 13.1873, continent: 'Africa' },
    { id: 'lilongwe', name: 'Lilongwe', country: 'Malawi', timezone: 'Africa/Blantyre', lat: -13.9830, lng: 33.7830, continent: 'Africa' },
    { id: 'bamako', name: 'Bamako', country: 'Mali', timezone: 'Africa/Bamako', lat: 12.6392, lng: -8.0029, continent: 'Africa' },
    { id: 'nouakchott', name: 'Nouakchott', country: 'Mauritania', timezone: 'Africa/Nouakchott', lat: 18.0790, lng: -15.9657, continent: 'Africa' },
    { id: 'port-louis', name: 'Port Louis', country: 'Mauritius', timezone: 'Indian/Mauritius', lat: -20.1619, lng: 57.4989, continent: 'Africa' },
    { id: 'maputo', name: 'Maputo', country: 'Mozambique', timezone: 'Africa/Maputo', lat: -25.9692, lng: 32.5732, continent: 'Africa' },
    { id: 'windhoek', name: 'Windhoek', country: 'Namibia', timezone: 'Africa/Windhoek', lat: -22.5594, lng: 17.0832, continent: 'Africa' },
    { id: 'niamey', name: 'Niamey', country: 'Niger', timezone: 'Africa/Niamey', lat: 13.5214, lng: 2.1053, continent: 'Africa' },
    { id: 'kigali', name: 'Kigali', country: 'Rwanda', timezone: 'Africa/Kigali', lat: -1.9706, lng: 30.1044, continent: 'Africa' },
    { id: 'sao-tome', name: 'São Tomé', country: 'Sao Tome and Principe', timezone: 'Africa/Sao_Tome', lat: 0.3365, lng: 6.7273, continent: 'Africa' },
    { id: 'victoria', name: 'Victoria', country: 'Seychelles', timezone: 'Indian/Mahe', lat: -4.6200, lng: 55.4550, continent: 'Africa' },
    { id: 'freetown', name: 'Freetown', country: 'Sierra Leone', timezone: 'Africa/Freetown', lat: 8.4871, lng: -13.2356, continent: 'Africa' },
    { id: 'mogadishu', name: 'Mogadishu', country: 'Somalia', timezone: 'Africa/Mogadishu', lat: 2.0371, lng: 45.3438, continent: 'Africa' },
    { id: 'juba', name: 'Juba', country: 'South Sudan', timezone: 'Africa/Juba', lat: 4.8517, lng: 31.5825, continent: 'Africa' },
    { id: 'lome', name: 'Lomé', country: 'Togo', timezone: 'Africa/Lome', lat: 6.1287, lng: 1.2215, continent: 'Africa' },
    { id: 'lusaka', name: 'Lusaka', country: 'Zambia', timezone: 'Africa/Lusaka', lat: -15.4067, lng: 28.2871, continent: 'Africa' },
    { id: 'harare', name: 'Harare', country: 'Zimbabwe', timezone: 'Africa/Harare', lat: -17.8277, lng: 31.0534, continent: 'Africa' },

    // Oceania
    { id: 'sydney', name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093, continent: 'Oceania' },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', lat: -37.8136, lng: 144.9631, continent: 'Oceania' },
    { id: 'auckland', name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', lat: -36.8485, lng: 174.7633, continent: 'Oceania' },
    { id: 'perth', name: 'Perth', country: 'Australia', timezone: 'Australia/Perth', lat: -31.9505, lng: 115.8605, continent: 'Oceania' },
    { id: 'suva', name: 'Suva', country: 'Fiji', timezone: 'Pacific/Fiji', lat: -18.1248, lng: 178.4501, continent: 'Oceania' },
    { id: 'port-moresby', name: 'Port Moresby', country: 'Papua New Guinea', timezone: 'Pacific/Port_Moresby', lat: -9.4431, lng: 147.1803, continent: 'Oceania' },
    { id: 'brisbane', name: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane', lat: -27.4698, lng: 153.0251, continent: 'Oceania' },
    { id: 'honolulu', name: 'Honolulu', country: 'United States', timezone: 'Pacific/Honolulu', lat: 21.3069, lng: -157.8583, continent: 'Oceania' },
    { id: 'noumea', name: 'Noumea', country: 'New Caledonia', timezone: 'Pacific/Noumea', lat: -22.2735, lng: 166.4468, continent: 'Oceania' },
];

export function searchCities(query: string): CityData[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    return WORLD_CITIES.filter(city =>
        city.name.toLowerCase().includes(lowerQuery) ||
        city.country.toLowerCase().includes(lowerQuery) ||
        city.continent.toLowerCase().includes(lowerQuery) ||
        city.timezone.toLowerCase().includes(lowerQuery)
    ).sort((a, b) => {
        // Boost exact matches or prefix matches
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const aCountry = a.country.toLowerCase();
        const bCountry = b.country.toLowerCase();

        if (aName === lowerQuery || aCountry === lowerQuery) return -1;
        if (bName === lowerQuery || bCountry === lowerQuery) return 1;

        if (aName.startsWith(lowerQuery)) return -1;
        if (bName.startsWith(lowerQuery)) return 1;

        return 0;
    });
}

export function getCityById(id: string): CityData | undefined {
    return WORLD_CITIES.find(city => city.id === id);
}
