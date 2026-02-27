"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { format } from 'date-fns';

import { Button } from '@/components/button/button';
import { GeoEntity } from '@/lib/models';
import { HotelData, usePricesAndHotelsByCountry } from "@/lib/hooks/third-task/use-prices-and-hotel-by-country";
import { useCountriesQuery } from "@/lib/hooks/third-task/use-countries-query";

// note: import SearchForm from './components/search-form' instead of '@/components/search-form/search-form' because we need to pass countries to the search form
import SearchForm from './components/search-form';
import Hotel from './components/hotel';

const formatter = new Intl.NumberFormat('fr-FR');

export default function ThirdPage() {
  const { countries, countriesDictionary, isLoading: countriesLoading, error: countriesError } = useCountriesQuery();
  const { data, loading, error, isEmpty, fetchPrices }: ReturnType<typeof usePricesAndHotelsByCountry> = usePricesAndHotelsByCountry(2);
  const [ disabled, setDisabled ] = useState(false);

  // disable button when loading
  useEffect(() => {
    setDisabled(loading);
  }, [loading]);

  // render hotel items
  const renderItems = useMemo(() => data.map((item: HotelData) => {
    const country = countriesDictionary[item.hotel.countryId];
    const startDate = format(new Date(item.startDate), 'dd.MM.yyyy');
    const price = formatter.format(item.amount);
    return (
      <Hotel key={item.id} data={{ ...item, startDate, price, country }} />
    );
  }), [data, countriesDictionary]);

  const handleSubmit = useCallback((selectedItem: GeoEntity | null) => {
    fetchPrices(selectedItem?.countryId as string);
  }, [fetchPrices]);

  // enable button when item is changed
  const handleItemChange = useCallback((_: GeoEntity | null) => {
    setDisabled(false);
  }, [setDisabled]);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <SearchForm className="min-w-350 p-4 rounded-lg" handleSubmit={handleSubmit} countries={countries} handleItemChange={handleItemChange}>
        <Button type="submit" className="btn-primary w-100 py-3" disabled={disabled}>Знайти</Button>
      </SearchForm>
      {loading && <div>Loading...</div>}
      {error && <p className="text-red">Error: {error.message}</p>}
      {isEmpty && <div>За вашим запитом турів не знайдено</div>}
      {
        !loading && data?.length > 0 && 
        <div className="content">{renderItems}</div>
      }
    </div>    
  );
}
