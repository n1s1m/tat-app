import { useQuery } from '@tanstack/react-query';
import { countriesApi } from '@/lib/api/countries';
import { Country, GeoEntity } from '@/lib/models';
import { addTypeAndCountryId } from '@/lib/helpers/add-type-and-country-id';

export function useCountriesQuery() {
  const { data, isLoading, error } = useQuery(countriesApi.getCountriesQueryOptions());
  const countries = (Object.values(data || {}) as Country[]).map(addTypeAndCountryId('country')) as GeoEntity[];
  return { countries, countriesDictionary: data || {} as Record<string, GeoEntity>, isLoading, error };
}
