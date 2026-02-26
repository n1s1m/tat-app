import { MapPin } from 'lucide-react';

import { City as CityEntity } from "@/lib/models";


export const CityItem = ({ city }: { city: CityEntity }) => {
    return (
        <div className="flex items-center gap-2">
            <MapPin className="item-icon" />
            {city.name}
        </div>
    );
};