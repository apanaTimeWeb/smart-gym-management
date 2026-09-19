"use client";
// RESPONSIBILITY: Renders an accessible searchable popover selector for Admin feature filters and entity selectors.
import React, { useEffect, useId, useRef, useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import type { AdminSearchableDropdownOption, AdminSearchableDropdownProps } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdownTypes';

export const AdminSearchableDropdown: React.FC<AdminSearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between text-left ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        onClick={() => !disabled && setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        disabled={disabled}
      >
        <span className={`text-sm ${!selectedOption ? 'text-secondary' : 'text-primary'} truncate`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className="text-secondary" aria-hidden="true" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-popover overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
          <div className="p-2 border-b border-border relative">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" />
            <label htmlFor={`${listboxId}-search`} className="sr-only">Search options</label>
            <input
              id={`${listboxId}-search`}
              type="text"
              className="w-full min-h-11 pl-8 pr-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
            />
          </div>

          <div id={listboxId} className="max-h-60 overflow-y-auto p-1 custom-scrollbar" role="listbox" aria-label={placeholder}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: AdminSearchableDropdownOption) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full min-h-11 flex items-center justify-between px-3 py-2 text-sm rounded-md text-left cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${option.value === value ? 'text-primary font-medium' : 'text-primary'}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={option.value === value}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check size={14} className="text-primary" aria-hidden="true" />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-secondary" role="status">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
