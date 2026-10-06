// RESPONSIBILITY: Owns the Manager role's keyboard-driven route command palette; it performs navigation only and contains no feature business data.
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Command, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/ManagerNavigationConfig';
import type { ManagerCommandPaletteProps } from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_command_palette/ManagerCommandPaletteTypes';

/**
 * @description Provides the Manager role's route command palette with explicit keyboard shortcuts, route filtering, focus restoration, and accessible status semantics. It delegates navigation to Next.js and reads only the role-owned navigation registry.
 * @dependencies Uses ManagerNavigationConfig, Next.js router/navigation lifecycle, next-intl labels, and lucide-react icons. No feature business API/state dependencies are permitted.
 * @edge-case Restores focus to the element active before opening, closes on Escape, avoids opening while the user is already typing in a native editable control, and safely handles an empty search result without inventing a route.
 */
export default function ManagerCommandPalette({ requestedOpen = false, onRequestedOpenHandled }: ManagerCommandPaletteProps) {
  const t = useTranslations('MANAGER_SHELL');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const commands = useMemo(
    () => MANAGER_NAV_GROUPS.flatMap((group) => group.items.map((item) => ({
      href: item.href,
      labelKey: item.labelKey,
      icon: item.icon,
    }))),
    [],
  );

  const filteredCommands = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => command.labelKey.toLowerCase().includes(normalized) || command.href.toLowerCase().includes(normalized));
  }, [commands, searchQuery]);

  const closePalette = () => {
    setIsOpen(false);
    setShowShortcutHelp(false);
    setSearchQuery('');
    window.requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    });
  };

  const openPalette = () => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
    setShowShortcutHelp(false);
    setSearchQuery('');
  };

  // EFFECT: Opens the palette when the shell requests it and acknowledges the request once handled.
  useEffect(() => {
    if (!requestedOpen) return;
    openPalette();
    onRequestedOpenHandled?.();
  }, [requestedOpen, onRequestedOpenHandled]);

  // EFFECT: Restores keyboard focus to the search input whenever the palette becomes visible.
  useEffect(() => {
    if (!isOpen) return;
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [isOpen]);

  // EFFECT: Registers the Manager shell keyboard shortcuts and removes the listener on unmount.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const editable = target?.matches('input, textarea, select, [contenteditable="true"]');
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (!isOpen) openPalette();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        if (editable && !isOpen) {
          event.preventDefault();
          const form = target?.closest('form');
          if (form instanceof HTMLFormElement) form.requestSubmit();
        }
        return;
      }
      if (!isOpen && event.key === '?' && !editable) {
        event.preventDefault();
        previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setIsOpen(true);
        setShowShortcutHelp(true);
        return;
      }
      if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        closePalette();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-overlay-backdrop p-4 pt-24" role="presentation">
      <button
        type="button"
        data-testid="manager_navigation-command-palette-backdrop-close"
        aria-label={t('COMMAND_PALETTE_CLOSE_BUTTON')}
        className="absolute inset-0 cursor-default"
        onClick={closePalette}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-navigation-command-palette-title"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-overlay shadow-dialog"
        data-testid="manager_navigation-command-palette-dialog"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary" aria-hidden="true">
              <Command size={18} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h2 id="manager-navigation-command-palette-title" className="truncate text-sm font-semibold text-primary">{t('COMMAND_PALETTE_TITLE')}</h2>
              <p className="truncate text-xs text-secondary">{t('COMMAND_PALETTE_DESCRIPTION')}</p>
            </div>
          </div>
          <button
            type="button"
            data-testid="manager_navigation-command-palette-button-close"
            onClick={closePalette}
            aria-label={t('COMMAND_PALETTE_CLOSE_BUTTON')}
            className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {showShortcutHelp ? (
          <div className="space-y-4 p-5" data-testid="manager_navigation-command-palette-shortcut-help" role="status">
            <h3 className="text-sm font-semibold text-primary">{t('SHORTCUT_HELP_TITLE')}</h3>
            <div className="grid grid-cols-1 gap-2 text-sm text-secondary sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_COMMAND_PALETTE')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-primary">Ctrl K</kbd></div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_SAVE')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-primary">Ctrl S</kbd></div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_CLOSE')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-primary">Esc</kbd></div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"><span>{t('SHORTCUT_HELP')}</span><kbd className="rounded border border-border bg-input px-2 py-1 text-xs text-primary">?</kbd></div>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-border p-3">
              <label htmlFor="manager-navigation-command-palette-search" className="sr-only">{t('COMMAND_PALETTE_SEARCH')}</label>
              <div className="relative">
                <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  id="manager-navigation-command-palette-search"
                  ref={searchInputRef}
                  data-testid="manager_navigation-command-palette-input-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t('COMMAND_PALETTE_SEARCH')}
                  aria-label={t('COMMAND_PALETTE_SEARCH')}
                  className="w-full rounded-xl border border-border bg-input py-2.5 pl-10 pr-4 text-sm text-primary outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto p-2" data-testid="manager_navigation-command-palette-results">
              {filteredCommands.length > 0 ? filteredCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.href}
                    type="button"
                    data-testid={`manager_navigation-command-palette-page-${command.labelKey.toLowerCase()}`}
                    onClick={() => { router.push(command.href); closePalette(); }}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"
                  >
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{t(command.labelKey)}</span>
                    <span className="text-xs text-disabled">{command.href}</span>
                  </button>
                );
              }) : (
                <div className="px-4 py-8 text-center text-sm text-secondary" role="status" data-testid="manager_navigation-command-palette-empty-state">
                  {t('COMMAND_PALETTE_NO_RESULTS')}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border bg-card px-4 py-2 text-xs text-secondary">
              <span>{filteredCommands.length} {t('COMMAND_PALETTE_RESULTS')}</span>
              <span>{t('COMMAND_PALETTE_TIP')}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
