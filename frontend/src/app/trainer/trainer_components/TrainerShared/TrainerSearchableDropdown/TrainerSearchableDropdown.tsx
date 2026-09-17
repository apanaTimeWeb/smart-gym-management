'use client';
// RESPONSIBILITY: Renders a custom searchable popover dropdown for large datasets (Rule 20). Replaces native <select> for all gyms/plans/user selectors.
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

export interface TrainerSearchableDropdownOption {
  value: string | number;
  label: string;
}

export interface TrainerSearchableDropdownProps {
  options: TrainerSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  
}

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
        className={`w-full bg-input border border-border rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            setIsOpen((current) => !current);
          }
        }}
      >
        <span className={`text-sm ${!selectedOption ? 'text-muted-foreground' : 'text-foreground'} truncate`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className="text-muted-foreground" />
      </button>

      {isOpen && !disabled && (
        <div role="listbox" className="absolute z-30 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden motion-safe:animate-in fade-in zoom-in-95 motion-safe:duration-fast">
          <div className="p-2 border-b border-border relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-input border border-border rounded-md focus-visible:outline-none focus-visible:border-primary text-foreground placeholder-muted-foreground"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-input ${
                    option.value === value ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {option.value === value && <Check size={18} className="text-primary" />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-center text-muted-foreground">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

