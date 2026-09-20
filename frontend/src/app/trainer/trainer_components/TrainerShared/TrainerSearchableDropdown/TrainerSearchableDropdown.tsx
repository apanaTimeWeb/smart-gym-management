// RESPONSIBILITY: Renders a custom searchable popover dropdown for large datasets (Rule 20). Replaces native <select> for all gyms/plans/user selectors.
'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import type { TrainerSearchableDropdownOption } from '@/app/trainer/trainer_components/trainer_components_types/TrainerSearchableDropdownOption';
import type { TrainerSearchableDropdownProps } from '@/app/trainer/trainer_components/trainer_components_types/TrainerSearchableDropdownProps';




export default function TrainerSearchableDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  className = '',
  disabled = false,
}: TrainerSearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        className={`w-full bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            setIsOpen((current) => !current);
          }
        }}
      >
        <span className={`text-sm ${!selectedOption ? 'text-secondary' : 'text-primary'} truncate`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className="text-secondary" />
      </button>

      {isOpen && !disabled && (
        <div role="listbox" className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-card overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-fast">
          <div className="p-2 border-b border-border relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:border-primary text-primary placeholder:text-secondary"
              aria-label="Search options"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); setIsOpen(false); setSearchTerm(''); } }}
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  key={option.value}
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-input motion-safe:transition-colors motion-safe:duration-base ${
                    option.value === value ? 'text-primary font-medium' : 'text-primary'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors motion-safe:duration-base`}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check size={18} className="text-primary" />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-secondary">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

