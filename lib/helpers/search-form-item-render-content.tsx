import { CountryItem } from "@/components/search-form/country-item";
import { CityItem } from "@/components/search-form/city-item";
import { HotelItem } from "@/components/search-form/hotel-item";
import { GeoEntity } from "../models";

// render item content based on item type
export const searchFormItemRenderContent = (item: GeoEntity): React.ReactNode => {
    if (item.type === 'country') return <CountryItem country={item} />;
    if (item.type === 'city') return <CityItem city={item} />;
    if (item.type === 'hotel') return <HotelItem hotel={item} />;
    return null;
}   