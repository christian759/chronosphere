import { Globe } from '../components/Globe';
import { ImmersiveLayout } from '../components/ImmersiveLayout';

export function GlobePage() {
    return (
        <div className="w-full h-screen">
            <ImmersiveLayout>
                <Globe />
            </ImmersiveLayout>
        </div>
    );
}
