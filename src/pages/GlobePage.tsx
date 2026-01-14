import { useState } from 'react';
import { Globe } from '../components/Globe';
import { ImmersiveLayout } from '../components/ImmersiveLayout';

export function GlobePage() {
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

    return (
        <div className="w-full h-screen">
            <ImmersiveLayout onCitySelect={setSelectedCityId}>
                <Globe targetCityId={selectedCityId || undefined} />
            </ImmersiveLayout>
        </div>
    );
}
