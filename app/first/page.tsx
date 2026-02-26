"use client";

import { Button } from '@/components/button/button';
import Form from "./components/form";
import { GeoEntity } from '@/lib/models';
import { useCallback } from 'react';

export default function FirstPage() {

  const handleSubmit = useCallback((selectedItem: GeoEntity | null) => {
    console.log('FORM SUBMITTED: selectedItem', selectedItem);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form className="min-w-350 p-4" handleSubmit={handleSubmit}>
        <Button type="submit" className="btn-primary w-100 py-3">Знайти</Button>
      </Form>
    </div>
  );
}
