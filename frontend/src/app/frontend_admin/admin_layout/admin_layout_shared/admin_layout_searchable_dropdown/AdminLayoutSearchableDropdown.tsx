"use client";
// RESPONSIBILITY: Renders an accessible searchable popover selector for Admin feature filters and entity selectors.
import { useTranslations } from 'next-intl';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import type { AdminSearchableDropdownOption, AdminSearchableDropdownProps } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/admin_layout_searchable_dropdown_types/AdminLayoutSearchableDropdownTypes';

/**
 * AdminLayoutSearchableDropdown renders the admin searchable dropdown UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export const AdminLayoutSearchableDropdown: React.FC<AdminSearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  testId,
}) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()));

// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_shared/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown.tsx.
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

// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_shared/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown.tsx.
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
        className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 motion-safe:transition-all motion-safe:duration-base ease-in-out w-full min-h-11 bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between text-left ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        onClick={() => !disabled && setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        disabled={disabled}
       data-testid={testId}>
        <span className={`text-sm ${!selectedOption ? 'text-secondary' : 'text-primary'} truncate`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-popover overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
          <div className="p-2 border-b border-border relative">
            <span className="absolute inset-y-0 left-4 flex items-center"><Search size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/></span>
            <label htmlFor={`${listboxId}-search`} className="sr-only">{t('admin_layout.admin_layout_shared/admin_layout_searchable_dropdown.text_5616c87222')}</label>
            <input
              id={`${listboxId}-search`}
              type="text"
              className="w-full min-h-11 pl-8 pr-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              placeholder={t('admin_layout.admin_layout_shared/admin_layout_searchable_dropdown.text_6d7a30a931')}
              data-testid={testId ? `${testId}-search` : undefined}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
            />
          </div>

          <div id={listboxId} className="max-h-60 overflow-y-auto p-1 custom-scrollbar" role="listbox" aria-label={placeholder} data-testid="admin_layout-admin-searchable-dropdown-search-3">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: AdminSearchableDropdownOption , __testIdIndex95) => (
                <button
                  key={option.value}
                  type="button"
                  className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 motion-safe:transition-all motion-safe:duration-base ease-in-out w-full min-h-11 flex items-center justify-between px-3 py-2 text-sm rounded-md text-left cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${option.value === value ? 'text-primary font-medium' : 'text-primary'}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={option.value === value}
                 data-testid={`admin_layout-admin-searchable-dropdown-search-4-map95-${__testIdIndex95}-1`}>
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/>}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-secondary" role="status" data-testid="admin_layout-admin-searchable-dropdown-search-5">
                {t('admin_layout.admin_layout_shared/admin_layout_searchable_dropdown.text_658e79f9dc')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
