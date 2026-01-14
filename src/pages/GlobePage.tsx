import { Globe } from '../components/Globe';
import { ImmersiveLayout } from '../components/ImmersiveLayout';
import { useTheme } from '../hooks/useTheme';

export function GlobePage() {
    const { setTheme } = useTheme();

    // Force immersive theme (dark/space) when entering
    // In a real app we might respect user choice or have a "Cinematic Mode"

    return (
        <div className="w-full h-screen">
            <ImmersiveLayout>
                <Globe />
            </ImmersiveLayout>
        </div>
    );
}
