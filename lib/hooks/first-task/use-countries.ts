"use client";

import { useEffect, useState } from "react";

import { Country, GeoEntity } from '@/lib/models';

const addType = (type: 'country') => (entity: Country): GeoEntity => ({ ...entity, type });

export function useCountries(): { countries: Array<GeoEntity>, loading: boolean, error: Error | null } {
    const [countries, setCountries] = useState<Array<GeoEntity>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('/api/countries')
            .then(res => res.json())
            .then(data => setCountries((Object.values(data) as Array<Country>).map(addType('country'))))
            .catch((err: Error) => setError(err as Error))
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading, error }
}
