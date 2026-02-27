import { queryOptions } from '@tanstack/react-query';
import { Hotel } from '@/lib/models';

export const hotelsApi = {
  baseKey: 'hotels' as const,

  
  queryKeys: {
    all: ['hotels'] as const,
    getHotels: (countryID: string) => [...hotelsApi.queryKeys.all, countryID] as const,
    getHotel: (hotelID: number) => [...hotelsApi.queryKeys.all, 'hotel', hotelID] as const,
  },

  getHotelsQueryOptions: (countryID: string) => {
    return queryOptions({
      queryKey: hotelsApi.queryKeys.getHotels(countryID),
      queryFn: async ({ signal }) => {
        const response = await fetch(`/api/hotels?countryID=${countryID}`, {
          method: 'GET',
          signal,
        });
        return response.json().then((response) => {
          if (response.error) {
            throw new Error(response.error);
          }
          return response;
        });
      },
      staleTime: 1000 * 60
    });
  },

  getHotelQueryOptions: (hotelID: number) => {
    return queryOptions({
      queryKey: hotelsApi.queryKeys.getHotel(hotelID),
      queryFn: async ({ signal }) => {
        const response = await fetch(`/api/hotels/${hotelID}`, {
          method: 'GET',
          signal,
        });
        return response.json().then((response) => {
          if (response.error) {
            throw new Error(response.error);
          }
          return response;
        });
      }
    });
  },
};
