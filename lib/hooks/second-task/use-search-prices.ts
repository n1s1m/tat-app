import { ManagedTimerId, timeoutManager, useQuery, useQueryClient } from '@tanstack/react-query';
import { pricesApi } from '@/lib/api/prices';
import { RefObject, useEffect, useRef, useState } from 'react';


export function useStartSearctPrices(countryID: string) {
  return useQuery(pricesApi.startSearchQueryOptions(countryID));
}

export function useGetSearchPrices(token: string, retry: number = 2) {
  return useQuery(pricesApi.getSearchPricesQueryOptions(token, retry));
}

export function useStopSearchPrices(token: string, retry: number = 2) {
  return useQuery(pricesApi.stopSearchQueryOptions(token, retry));
}

interface SearchPricesState {
  loading: boolean;
  error: Error | null;
  data: SearchPricesResponse[];
  isEmpty: boolean;
}

interface SearchPricesResponse {
  amount: number;
  currency: string;
  endDate: string;
  hotelID: string;
  id: string;
  startDate: string;
}

export function useSearchPrices(retry: number = 2) {
  const [{ loading, error, data, isEmpty }, setState] = useState<SearchPricesState>({ loading: false, error: null, data: [], isEmpty: false });
  const queryClient = useQueryClient();

  const timeoutId = useRef<ManagedTimerId | undefined>(undefined);

  const fetchPrices = async (countryID: string) => {
    console.log('timeoutId.current', timeoutId.current);
    if (timeoutId.current) {
      timeoutManager.clearTimeout(timeoutId.current);
    }
    await queryClient.cancelQueries({ queryKey: pricesApi.queryKeys.getSearchPricesAll() }); // cancel all getSearchPrices queries
    setState((prev) => ({ ...prev, loading: true, error: null, data: [], isEmpty: false }));
    try {
      const startResponse = await queryClient.fetchQuery(pricesApi.startSearchQueryOptions(countryID));
      const waitUntil = (Date.parse(new Date(startResponse.waitUntil).toISOString()) - Date.parse(new Date().toISOString()));
      
      timeoutId.current = timeoutManager.setTimeout(() => {
        queryClient
          .fetchQuery(pricesApi.getSearchPricesQueryOptions(startResponse.token, retry))
          .catch((error) => {
            setState((prev) => ({ ...prev, loading: false, error: error as Error, data: [], isEmpty: false }));
            throw new Error(error.message);
          })
          .then((response) => {
            const data = Object.values(response || {});
            setState((prev) => ({ ...prev, loading: false, error: null, data: data as SearchPricesResponse[], isEmpty: data.length === 0 }));
          });
      }, waitUntil);
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error as Error, data: [], isEmpty: false }));
    }
  };

  return { loading, error, data, isEmpty, fetchPrices };
}
