// RESPONSIBILITY: Renders ManagerSearchableDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ManagerSearchableDropdownProps } from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdownTypes';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

/** Provides a searchable single-selection listbox with keyboard and screen-reader support. */
/**
 * @description Renders the `ManagerSearchableDropdown` component for the `components` feature boundary. Owns this component’s presentation/orchestration responsibility and delegates server data and business mutations to the documented hooks/API layer.
 * @dependencies Uses useEffect, useId, useRef, useState, Search; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves the documented loading, empty, error, disabled, keyboard, responsive, and retry/confirmation states without introducing sibling-feature business dependencies.
 */
export default function ManagerSearchableDropdown({
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = '',
  disabled = false,
  dataTestId,
  ariaInvalid = false,
  ariaDescribedBy,
}: ManagerSearchableDropdownProps) {
  const t = useTranslations('MANAGER_SHELL');
  const effectivePlaceholder = placeholder ?? t('TEXT_SELECT_AN_OPTION');

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const baseTestId = dataTestId.trim();
  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!isOpen) return undefined;
    searchInputRef.current?.focus();
    return undefined;
  }, [isOpen]);

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
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

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const selectedIndex = filteredOptions.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [searchTerm, value, filteredOptions.length]);

  const close = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectOption = (optionValue: string | number) => {
    onChange(optionValue);
    close();
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListboxKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (!filteredOptions.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(filteredOptions.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option) selectOption(option.value);
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''} motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`${baseTestId}-trigger`}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-label={ariaLabel ?? effectivePlaceholder}
        onClick={() => {
          if (!disabled) setIsOpen((open) => !open);
        }}
        onKeyDown={handleTriggerKeyDown}
        aria-invalid={ariaInvalid ? 'true' : undefined}
        aria-describedby={ariaDescribedBy}
      >
        <span className={`text-sm ${selectedOption ? 'text-primary' : 'text-secondary'} truncate`}>
          {selectedOption ? selectedOption.label : effectivePlaceholder}
        </span>
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true" className="text-secondary"/>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-popover overflow-hidden motion-safe:transition-all motion-safe:duration-base">
          <div className="p-2 border-b border-border relative">
            <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input data-testid={`${baseTestId}-search`}
              ref={searchInputRef}
              type="search"
              aria-label={t("COPY_SEARCH_OPTIONS")}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={filteredOptions[activeIndex] ? `${listboxId}-option-${String(filteredOptions[activeIndex].value)}` : undefined}
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary placeholder:text-secondary"
              placeholder={t("COPY_SEARCH")}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleListboxKeyDown}
            />
          </div>

          <div data-testid={`${baseTestId}-options`} id={listboxId} role="listbox" aria-label={t("COPY_OPTIONS")} className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {(() => { if (filteredOptions.length > 0) { return (
              filteredOptions.map((option, index) => {
                const optionId = `${listboxId}-option-${String(option.value)}`;
                const isSelected = option.value === value;
                const isActive = index === activeIndex;
                return (
                  <div
                    id={optionId}
                    data-testid={`${baseTestId}-option-${String(option.value).toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`}
                    key={String(option.value)}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    className={`flex items-center justify-between px-3 py-2 text-sm rounded-md ${isActive ? 'bg-input' : ''} ${isSelected ? 'text-primary font-medium' : 'text-primary'}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectOption(option.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        selectOption(option.value);
                      } else if (event.key === 'Escape') {
                        event.preventDefault();
                        close();
                      }
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <Check size={18} strokeWidth={2} aria-hidden="true" className="text-primary"/>}
                  </div>
                );
              })
            ); } return (
              <div data-testid={`${baseTestId}-empty`} className="px-3 py-4 text-sm text-center text-secondary" role="status">{t("COPY_NO_RESULTS_FOUND")}</div>
            ); })()}
          </div>
        </div>
      )}
    </div>
  );
}

export { ManagerSearchableDropdown };
