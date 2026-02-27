"use client";

import { useCallback } from "react";

import SearchForm from "@/components/search-form/search-form";
import { Button } from '@/components/button/button';
import { GeoEntity } from '@/lib/models';
import { useSearchPrices } from '@/lib/hooks/second-task/use-search-prices';

export default function SecondPage() {

  const { data, loading, error, isEmpty, fetchPrices } = useSearchPrices(2);

  const handleSubmit = useCallback((selectedItem: GeoEntity | null) => {
    fetchPrices(selectedItem?.countryId as string);
  }, [fetchPrices]);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <SearchForm className="min-w-350 p-4" handleSubmit={handleSubmit}>
        <Button type="submit" className="btn-primary w-100 py-3">Знайти</Button>
      </SearchForm>
      {loading && <div>Loading...</div>}
      {error && <p className="text-red">Error: {error.message}</p>}
      {isEmpty && <div>За вашим запитом турів не знайдено</div>}
      {!loading && data?.length > 0 && <div>Data: {JSON.stringify(data)}</div>}
    </div>    
  );
}
