'use client';
// RESPONSIBILITY: Renders the Messaging Tenant Dropdown component and its associated UI logic.
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { MessagingTenant } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

export function SuperadminMessagingTenantDropdown({
  value,
  onChange,
  tenants,
}: {
  value: string;
  onChange: (id: string) => void;
  tenants: MessagingTenant[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selected = tenants.find((t) => t.id === value);
  const filtered = tenants.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  // RESPONSIBILITY: Handle side-effects for SuperadminMessagingTenantDropdown
  // EXPLANATION: Synchronize component state with external dependencies.
  // EFFECT DEPENDENCIES: Documented intentionally.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(id: string) {
    onChange(id);
    setOpen(false);
    setQuery('');
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors"
      >
        <span className={selected ? 'text-foreground' : 'text-secondary'}>
          {selected ? `${selected.name} — ${selected.plan}` : 'Select gym...'}
        </span>
        <ChevronDown className="w-5 h-5 text-secondary shrink-0" strokeWidth={2}  />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full bg-popover border border-border rounded-lg shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary" />
              <input
                type="text"
                autoFocus
                placeholder="Search gyms..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>
          <ul role="listbox" className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-secondary">No gyms found.</li>
            )}
            {filtered.map((t) => (
              <li
                key={t.id}
                role="option"
                aria-selected={t.id === value}
                onClick={() => handleSelect(t.id)}
                className={`px-3 py-2 text-sm cursor-pointer motion-safe:transition-colors ${
                  t.id === value
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-input'
                }`}
              >
                {t.name} — {t.plan}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


