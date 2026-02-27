import { useQueryClient } from '@tanstack/react-query';
import { pricesApi } from '@/lib/api/prices';
import { useRef, useState } from 'react';
import { hotelsApi } from '@/lib/api/hotels';
import { Country, Hotel } from '@/lib/models';

interface SearchPricesState {
  loading: boolean;
  error: Error | null;
  data: SearchPricesResponse[];
  isEmpty: boolean;
}

export interface SearchPricesResponse {
  amount: number;
  currency: string;
  endDate: string;
  hotelID: string;
  id: string;
  startDate: string;
}

export type HotelData = SearchPricesResponse & { hotel: Hotel, price: string, startDate: string, country: Country, countryId: string };

export function usePricesAndHotelsByCountry(retry: number = 2): { loading: boolean, error: Error | null, data: HotelData[], isEmpty: boolean, fetchPrices: (countryID: string) => void } {
  const [{ loading, error, data, isEmpty }, setState] = useState<SearchPricesState>({ loading: false, error: null, data: [], isEmpty: false });
  const queryClient = useQueryClient();

  const abortControllerRef = useRef<AbortController | null>(null);
  const tokenRef = useRef<string | undefined>(undefined);

  const fetchPrices = async (countryID: string) => {
    // abort previous request if it is still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    // stop search if it is already running
    if (tokenRef.current) {
      await queryClient.fetchQuery(pricesApi.stopSearchQueryOptions(tokenRef.current, retry));
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    await queryClient.cancelQueries({ queryKey: pricesApi.queryKeys.getSearchPricesAll() }); // cancel all getSearchPrices queries
    await queryClient.cancelQueries({ queryKey: hotelsApi.queryKeys.all }); // cancel all getHotels queries

    setState((prev) => ({ ...prev, loading: true, error: null, data: [], isEmpty: false }));

    try {
      const startResponse = await queryClient.fetchQuery(pricesApi.startSearchQueryOptions(countryID, retry));
      tokenRef.current = startResponse.token as string;
      const waitUntil = (Date.parse(new Date(startResponse.waitUntil).toISOString()) - Date.parse(new Date().toISOString()));

      if (signal.aborted) {
        return;
      }

      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, waitUntil);
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new Error('Search has been cancelled'));
        });
      })

      const pricesResponse = await queryClient.fetchQuery(pricesApi.getSearchPricesQueryOptions(tokenRef.current as string, retry));
      const hotelsResponse = await queryClient.fetchQuery(hotelsApi.getHotelsQueryOptions(countryID));

      const data = Object.values(pricesResponse || {}).map((price: any) => {
        const hotel = hotelsResponse[price.hotelID];
        return {
          ...price,
          ...(hotel && { hotel }),
        }
      }) as HotelData[];
      // update state with the data and the hotel
      setState((prev) => ({ ...prev, loading: false, error: null, data: data as HotelData[], isEmpty: data.length === 0 }));
    } catch (error) {
      // update state with the error and empty data
      setState((prev) => ({ ...prev, loading: false, error: error as Error, data: [], isEmpty: false }));
    }
  };

  return { loading, error, data: data as HotelData[], isEmpty, fetchPrices };
}
