"use client";

import { useEffect, useState } from "react";

import { GeoEntity } from '@/lib/models';
import { useCountries } from './use-countries';
import { useSearchGeo } from './use-search-geo';


export function useSearch({ query = '', type = 'country' }: { query: string, type?: 'country' | 'all' }): { result: Array<GeoEntity>, loading: boolean, error: Error | null } {
    const [result, setResult] = useState<Array<GeoEntity>>([]);
    const { countries, error: countriesError, loading: countriesLoading } = useCountries();
    const { items, error: searchError, loading: searchLoading } = useSearchGeo({ query });

    useEffect(() => {
        if (query.length === 0 || type === 'country') {
            setResult(countries);
        } else {
            setResult(items);
        }
    }, [query, type, countries, items]);

    return { result, loading: countriesLoading || searchLoading, error: countriesError || searchError };
}
