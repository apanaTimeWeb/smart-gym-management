'use client';
// RESPONSIBILITY: Renders the Messaging Tenant Dropdown component and its associated UI logic.
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

import { Search, ChevronDown } from 'lucide-react';

import type { SuperadminMessagingTenantDropdownProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTenantDropdownTypes';

/**
 * @description Renders the Messaging Tenant Dropdown component and its associated UI logic.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export function SuperadminMessagingTenantDropdown({ value, onChange, tenants }: SuperadminMessagingTenantDropdownProps) {
  const t = useTranslations('superadmin_messaging');
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
      <button  type="button" onClick={() => setOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={open} className="min-h-11 w-full flex items-center justify-between px-3 py-2 bg-floating border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-tenant-dropdown-select">
        <span className={selected ? 'text-primary' : 'text-secondary'}>
          {selected ? `${selected.name} — ${selected.plan}` : t('ui.select_tenant_9946c98')}
        </span>
        <ChevronDown size={18} className="w-5 text-secondary shrink-0" strokeWidth={2}/>
      </button>

      {open && (<div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-popover">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <label htmlFor="superadmin_messaging-tenant-search" className="sr-only">{t('ui.search_gyms_e38120a')}</label>
              <Search size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary"/>
              <input  id="superadmin_messaging-tenant-search" type="text" autoFocus placeholder={t('ui.search_gyms_e38120a')} value={query} onChange={(e) => setQuery(e.target.value)} className="min-h-11 w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded-md text-sm text-primary focus:outline-none focus:border-focus focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_messaging-messaging-messaging-tenant-dropdown-filter"/>
            </div>
          </div>
          <div role="listbox" aria-label={t('ui.tenant_recipients_8634318')} className="max-h-48 overflow-y-auto" data-testid="superadmin_messaging-messaging-tenant-dropdown-action-1">
            {filtered.length === 0 && (<div className="px-3 py-2 text-sm text-secondary">{t('ui.no_tenants_found_b97e94e')}</div>)}
            {filtered.map((t, index) => (<button  key={t.id} type="button" role="option" aria-selected={t.id === value} onClick={() => handleSelect(t.id)} className={`min-h-11 block w-full px-3 py-2 text-left text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${t.id === value
                    ? 'bg-primary-subtle text-primary'
                    : 'text-primary hover:bg-surface-hover'} motion-safe:active:scale-95`} data-testid={`superadmin_messaging-messaging-messaging-tenant-dropdown-action2-${index}`}>
                {t.name} — {t.plan}
              </button>))}
          </div>
        </div>)}
    </div>);
}
