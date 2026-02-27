"use client";

import { useEffect, useState } from "react";

import { GeoEntity } from '@/lib/models';
import { useSearchGeo } from "../first-task/use-search-geo";


export function useSearch({ query = '', countries = [], type = 'country' }: { query: string, countries: GeoEntity[], type?: 'country' | 'all' }): { result: Array<GeoEntity>, loading: boolean, error: Error | null } {
    const [result, setResult] = useState<Array<GeoEntity>>([]);
    const { items, error: searchError, loading: searchLoading } = useSearchGeo({ query });

    useEffect(() => {
        if (query.length === 0 || type === 'country') {
            setResult(countries);
        } else {
            setResult(items);
        }
    }, [query, type, countries, items]);

    return { result, loading: searchLoading, error: searchError };
}
