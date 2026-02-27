import { useQuery, useQueryClient } from '@tanstack/react-query';
import { pricesApi } from '@/lib/api/prices';
import { useRef, useState } from 'react';


export function useStartSearchPrices(countryID: string) {
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

export interface SearchPricesResponse {
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

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPrices = async (countryID: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    await queryClient.cancelQueries({ queryKey: pricesApi.queryKeys.getSearchPricesAll() }); // cancel all getSearchPrices queries
    setState((prev) => ({ ...prev, loading: true, error: null, data: [], isEmpty: false }));

    try {
      const startResponse = await queryClient.fetchQuery(pricesApi.startSearchQueryOptions(countryID, retry));
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

      const pricesResponse = await queryClient.fetchQuery(pricesApi.getSearchPricesQueryOptions(startResponse.token, retry));
      const data = Object.values(pricesResponse || {});
      setState((prev) => ({ ...prev, loading: false, error: null, data: data as SearchPricesResponse[], isEmpty: data.length === 0 }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error as Error, data: [], isEmpty: false }));
    }
  };

  return { loading, error, data, isEmpty, fetchPrices };
}
