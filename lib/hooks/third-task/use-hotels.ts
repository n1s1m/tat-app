import { useQuery } from '@tanstack/react-query';
import { hotelsApi } from '@/lib/api/hotels';


export function useGetHotels(countryID: string) {
  return useQuery(hotelsApi.getHotelsQueryOptions(countryID));
}
