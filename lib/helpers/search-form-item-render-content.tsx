import { CountryItem } from "@/app/first/components/country-item";
import { CityItem } from "@/app/first/components/city-item";
import { HotelItem } from "@/app/first/components/hotel-item";
import { GeoEntity } from "../models";

// render item content based on item type
export const searchFormItemRenderContent = (item: GeoEntity): React.ReactNode => {
    if (item.type === 'country') return <CountryItem country={item} />;
    if (item.type === 'city') return <CityItem city={item} />;
    if (item.type === 'hotel') return <HotelItem hotel={item} />;
    return null;
}   