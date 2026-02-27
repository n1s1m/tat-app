import { useCallback, useEffect, useState, memo, useRef, useImperativeHandle } from "react";
import * as React from "react";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { X } from "lucide-react";


export const useDropdown = ({initialOpen, closeOnClickOutside = true, onOpen, onClose}: {initialOpen: boolean, closeOnClickOutside?: boolean, onOpen?: () => void | Promise<void>, onClose?: () => void | Promise<void> }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const toggle = useCallback(() => setIsOpen(state => !state), []);
  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (event.target instanceof HTMLElement && !event.target.closest('.dropdown-container')) {
      if (closeOnClickOutside) {
        close();
      }
    }
  }, [close, closeOnClickOutside]);

  return { isOpen, toggle, close, open, handleClickOutside, selectedItem, setSelectedItem };
};


export interface DropdownRef {
  open: () => void;
  close: () => void;
}

export const Dropdown = React.forwardRef<DropdownRef, { ref: React.RefObject<DropdownRef> | null, children: React.ReactNode, className?: string, onSearch: (search: string) => void, search: string, onClear: () => void, onOpen?: () => void | Promise<void>, onClose?: () => void | Promise<void> }>(({ children, className, onSearch, search, onClear, onOpen, onClose }, ref) => {
  const { isOpen, open, close, handleClickOutside } = useDropdown({ initialOpen: false, closeOnClickOutside: true, onOpen, onClose });
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => {
    return {
      open() {
        open();
      },
      close() {
        close();
      }
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);
  
  return (
    <div className={`dropdown-container ${className}`}>
      <Input name="search" type="text" placeholder="Введіть текст" ref={inputRef} className="w-100 p-2 rounded-md border border-solid border-gray-500 mb-1 pr-6" onFocus={open} value={search} onChange={(e) => onSearch(e.target.value)} />
      {search && (
        <Button variant="ghost" className="clear-button p-0 text-dark" onClick={() => {
          onClear();
          inputRef.current?.focus();
        }}>
          <X className="w-4 h-4" />
        </Button>
      )}
      <div className={`card p-0 rounded-md dropdown-content ${isOpen ? 'visible' : 'invisible'}`}>
        {children}
      </div>
    </div>
  );
});
