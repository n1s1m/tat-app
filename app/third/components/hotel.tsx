import { HotelData } from '@/lib/hooks/third-task/use-prices-and-hotel-by-country';
import { Button } from '@/components/button/button';

export default function Hotel({ data }: { data: HotelData }) {

    return (
        <div className="card min-w-250 p-4 rounded-lg">
            <img src={data.hotel.img} alt={data.hotel.name} className="card-image" loading="lazy" onError={(e) => (e.target as HTMLImageElement).src = '/images/hotel-placeholder.png'} />
            <h2 className="card-title">{data.hotel.name}</h2>
            <div className="card-text flex items-start">
                {data.country && <img src={data.country.flag} alt={data.country.name} className="item-icon mr-2" loading="lazy" onError={(e) => (e.target as HTMLImageElement).src = '/images/country-placeholder.png'} />}
                <span>{data.country.name}, {data.hotel.cityName}</span>
            </div>
            <p className="card-text pt-2">Старт тура</p>
            <p className="card-text text-base text-dark">{data.startDate}</p>
            <p className="text-lg font-bold pt-1 pb-1">{data.price} {data.currency}</p>
            <Button variant="link" className="text-medium text-base">Відкрити ціну</Button>
        </div>
    );
}