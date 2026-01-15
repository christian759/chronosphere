import { useWorldTimeContext } from '../context/WorldTimeContext';
import type { CityData } from '../utils/cities';

export type { CityData };

export function useWorldTime() {
    return useWorldTimeContext();
}
