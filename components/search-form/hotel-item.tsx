'use client';

import { Hotel } from 'lucide-react';

import { Hotel as HotelEntity } from "@/lib/models";


export const HotelItem = ({ hotel }: { hotel: HotelEntity }) => {
    return (
        <div className="flex items-center gap-2">
            <Hotel className="item-icon" />
            {hotel.name}
        </div>
    );
};