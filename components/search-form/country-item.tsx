import { Country } from "@/lib/models";

export const CountryItem = ({ country }: { country: Country }) => {
    return (
        <div className="flex items-center gap-2">
            {country.flag && <img src={country.flag} alt={country.name} className="item-icon" />}
            {country.name}
        </div>
    );
};