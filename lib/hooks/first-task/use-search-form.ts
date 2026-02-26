"use client";

import { useEffect, useCallback, useState } from "react";

import { DropdownRef } from "@/components/dropdown/dropdown";

import { GeoEntity } from "../../models";
import { useSearch } from "./use-search";


export function useSearchForm({ handleSubmit, dropdownRef }: { handleSubmit: (selectedItem: GeoEntity | null) => void | Promise<void>, dropdownRef: React.RefObject<DropdownRef | null>}) {
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<GeoEntity | null>(null);
    const [type, setType] = useState<'country' | 'all'>('country');
    const { result: items } = useSearch({ query: search, type: type || 'country' });

    // handle enter key to submit form
    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
        }
      };

    // handle search input and set type to all to show search results from searchGeo API
    const onSearch = useCallback((search: string) => { 
        setSearch(search); 
        setType('all');
    }, [setSearch]);

    // attach event listener to handle enter key globaly
      useEffect(() => { 
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
      }, [keyDownHandler]);

    // handle select item from dropdown
    const onSelect = useCallback((value: string) => {
        const item = items.find(item => item.id.toString() === value);
        if (item) {
            // set selected item
            setSelectedItem(item);
            // set search input to selected item name and set type to either country or all to show search results from searchGeo API or getCountries API
            setSearch(item.name);
            setType(item.type === 'country' ? 'country' : 'all');
        } else {
            setSelectedItem(null);
            setType('country');
        }
        // close dropdown
        dropdownRef?.current?.close();
    }, [items, setSelectedItem, setType]);

    // handle clear search input
    const onClear = useCallback(() => {
        setSearch('');
        // reset selected item
        setSelectedItem(null);
        // reset type to country to show search results from getCountries API
        setType('country');
    }, [setSearch, setSelectedItem, setType]);

    // handle submit form
    const onSubmit = (e?: React.FormEvent<HTMLFormElement> | undefined) => {
        // prevent default form submission
        if (e) {
            e.preventDefault();
        }
        // if no selected item, set error and return
        if (!selectedItem) {
            setError('Please select an item');
            return;
        }
        // close dropdown
        dropdownRef?.current?.close();
        // call handleSubmit callback
        handleSubmit(selectedItem);
    };

    // handle open dropdown
    const onOpen = useCallback(() => {
        // reset error
        setError(null);
    }, [setError]);

    return { search, error, selectedItem, type, items, onSearch, onSelect, onClear, onSubmit, onOpen };
}
