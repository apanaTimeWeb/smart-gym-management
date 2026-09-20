// RESPONSIBILITY: Renders the Messaging Tenant Dropdown component and its associated UI logic.
'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { SuperadminMessagingTenantDropdownProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTenantDropdownTypes';
export function SuperadminMessagingTenantDropdown({ value, onChange, tenants }: SuperadminMessagingTenantDropdownProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const selected = tenants.find((t) => t.id === value);
    const filtered = tenants.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));
    // RESPONSIBILITY: Handle side-effects for SuperadminMessagingTenantDropdown
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local UI state with the listed inputs and clean up any browser/resource subscription created by this effect.
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
    return (<div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={open} className="w-full flex items-center justify-between px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">
        <span className={selected ? 'text-primary' : 'text-secondary'}>
          {selected ? `${selected.name} — ${selected.plan}` : 'Select tenant...'}
        </span>
        <ChevronDown className="w-5 h-5 text-secondary shrink-0" strokeWidth={2}/>
      </button>

      {open && (<div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-popover">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary"/>
              <input type="text" autoFocus placeholder="Search gyms..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded-md text-sm text-primary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"/>
            </div>
          </div>
          <div role="listbox" aria-label="Tenant recipients" className="max-h-48 overflow-y-auto">
            {filtered.length === 0 && (<div className="px-3 py-2 text-sm text-secondary">No tenants found.</div>)}
            {filtered.map((t) => (<button key={t.id} type="button" role="option" aria-selected={t.id === value} onClick={() => handleSelect(t.id)} className={`block w-full px-3 py-2 text-left text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${t.id === value
                    ? 'bg-primary-subtle text-primary'
                    : 'text-primary hover:bg-input'}`}>
                {t.name} — {t.plan}
              </button>))}
          </div>
        </div>)}
    </div>);
}
