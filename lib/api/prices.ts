import { queryOptions } from '@tanstack/react-query';

export const pricesApi = {
  baseKey: 'prices' as const,

  
  queryKeys: {
    all: ['prices'] as const,
    startSearch: (countryID: string) => [...pricesApi.queryKeys.all, countryID, 'start'] as const,
    getSearchPrices: (token: string) => [...pricesApi.queryKeys.all, 'get', token] as const,
    getSearchPricesAll: () => [...pricesApi.queryKeys.all, 'get'] as const,  // to cancel queries
    stopSearch: (token: string) => [...pricesApi.queryKeys.all, 'stop', token] as const,
  },

  startSearchQueryOptions: (countryID: string, retry: number = 2) => {
    return queryOptions({
      queryKey: pricesApi.queryKeys.startSearch(countryID),
      queryFn: async ({ signal }) => {
        const response = await fetch('/api/prices', {
          method: 'POST',
          body: JSON.stringify({ countryID }),
          signal,
        });
        return response.json().then((response) => {
          if (response.error) {
            throw new Error(response.error);
          }
          return response;
        });
      },
      retry,
    });
  },

  getSearchPricesQueryOptions: (token: string, retry: number = 2) => {
    return queryOptions({
      queryKey: pricesApi.queryKeys.getSearchPrices(token),
      queryFn: async ({ signal }) => {
        const response = await fetch(`/api/prices?token=${token}`, {
          method: 'GET',
          signal,
        })
        return response.json().then((response) => {
          if (response.error) {
            throw new Error(response.error);
          }
          return response;
        });
      },
      retry,
    });
  },

  stopSearchQueryOptions: (token: string, retry: number = 2) => {
    return queryOptions({
      queryKey: pricesApi.queryKeys.stopSearch(token),
      queryFn: async ({ signal }) => {
        const response = await fetch(`/api/prices?token=${token}`, {
          method: 'DELETE',
          signal,
        });
        return response.json().then((response) => {
          if (response.error) {
            throw new Error(response.error);
          }
          return response;
        });
      },
      retry,
    });
  },
};
