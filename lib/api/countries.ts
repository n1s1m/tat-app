import { queryOptions } from '@tanstack/react-query';

export const countriesApi = {
  baseKey: 'countries' as const,

  
  queryKeys: {
    all: ['countries'] as const,
  },

  getCountriesQueryOptions: () => {
    return queryOptions({
      queryKey: countriesApi.queryKeys.all,
      queryFn: async ({ signal }) => {
        const response = await fetch(`/api/countries`, {
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
  }
};
