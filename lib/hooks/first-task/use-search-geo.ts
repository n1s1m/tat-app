"use client";

import { useEffect, useState } from "react";

import { GeoEntity } from '@/lib/models';


export function useSearchGeo({ query = '' }: { query: string }): { items: Array<GeoEntity>, loading: boolean, error: Error | null } {
    const [items, setItems] = useState<Array<GeoEntity>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (query.length === 0) {
            setItems([]);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        fetch(`/api/search?search=${query}`)
            .then(res => res.json())
            .then(data => setItems((Object.values(data))))
            .catch((err: Error) => setError(err as Error))
            .finally(() => setLoading(false));
    }, [query]);

    return { items, loading, error };
}
