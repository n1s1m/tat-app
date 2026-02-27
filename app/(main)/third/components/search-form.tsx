"use client";

import { useMemo, useRef } from "react";

import { Dropdown, DropdownRef } from "../../../../components/dropdown/dropdown";
import { DropdownItem } from "../../../../components/dropdown/dropdown-item";
import { GeoEntity } from "../../../../lib/models";
import { searchFormItemRenderContent } from "../../../../lib/helpers/search-form-item-render-content";
import { useSearchForm } from "../../../../lib/hooks/third-task/use-search-form";

export default function SearchForm({ children, className, handleSubmit, countries, handleItemChange }: { children: React.ReactNode, className?: string, handleSubmit: (selectedItem: GeoEntity | null) => void, countries: GeoEntity[], handleItemChange: (selectedItem: GeoEntity | null) => void }) {
    const dropdownRef = useRef<DropdownRef>(null);
    const { search, error, selectedItem, items, onSearch, onSelect, onClear, onSubmit, onOpen } = useSearchForm({ handleSubmit, dropdownRef, countries });

    // render dropdown items
    const renderItems = useMemo(() => items.map((item: GeoEntity) => (
        // render dropdown item
        <DropdownItem key={item.id} value={item.id.toString()} onSelect={(value) => {onSelect(value); handleItemChange(item);}} selected={selectedItem?.id === item.id}>
            {searchFormItemRenderContent(item)}
        </DropdownItem>
    )), [items, onSelect, searchFormItemRenderContent]);

    
    return (
        <form className={`card ${className}`} onSubmit={onSubmit}>
            <p className="card-title text-center">Форма пошуку турів</p>
            {error && <p className="text-red text-sm py-2">{error}</p>}
            <Dropdown ref={dropdownRef} search={search} onSearch={onSearch} onClear={onClear} className="mb-2" onOpen={onOpen}>
                {renderItems}
            </Dropdown>
            {children}
        </form>
    );
}
