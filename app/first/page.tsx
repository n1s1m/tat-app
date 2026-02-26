"use client";

import { useCallback } from 'react';
import SearchForm from "@/components/search-form/search-form";
import { Button } from '@/components/button/button';
import { GeoEntity } from '@/lib/models';

export default function FirstPage() {

  const handleSubmit = useCallback((selectedItem: GeoEntity | null) => {
    console.log('FORM SUBMITTED: selectedItem', selectedItem);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SearchForm className="min-w-350 p-4" handleSubmit={handleSubmit}>
        <Button type="submit" className="btn-primary w-100 py-3">Знайти</Button>
      </SearchForm>
    </div>
  );
}
