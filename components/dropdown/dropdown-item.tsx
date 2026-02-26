'use client';

import { memo, useCallback } from "react";

export const DropdownItem = memo(({ children, value, onSelect, selected }: { children: React.ReactNode, value: string, onSelect: (value: string) => void, selected: boolean }) => {
  const handleSelect = useCallback(() => {
    onSelect(value);
  }, [value, onSelect, selected]);
  return <div className={`dropdown-item p-2 ${selected ? 'selected' : ''}`} onClick={handleSelect} role="option" aria-selected="false">{children}</div>;
});
DropdownItem.displayName = 'DropdownItem';